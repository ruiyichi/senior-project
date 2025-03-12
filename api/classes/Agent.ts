import { Graph, alg } from "@dagrejs/graphlib";
import { Color, PlayerColor, Route } from "../types";
import { Game } from "./Game";
import { Player } from "./Player";
import { ROUTE_LENGTH_TO_POINTS, TRAIN_ROUTES } from "../constants";
import { find_steiner_tree } from "./SteinerTree";
import { randomElementFromArr } from "../utils";

interface IdealRoute {
  ticket_ids: string[],
  route: Route[]
}
export class Agent extends Player {
  graph: Graph;
  desiredRoutes: IdealRoute[];

  constructor(id: string, username: string, color: PlayerColor = PlayerColor.RED) {
    super(id, username, color);
    this.type = 'Agent';
    this.graph = new Graph({ directed: false });
    TRAIN_ROUTES.forEach(r => {
      this.graph.setNode(r.destination)
      this.graph.setNode(r.start);
      this.graph.setEdge(r.start, r.destination, { weight: r.path.length });
    });
    this.desiredRoutes = [];
  }

  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  findRoute(game: Game, first_city: string, second_city: string) {
    return game.routes.find(r => (r.start === first_city && r.destination === second_city) || (r.start === second_city && r.destination === first_city));
  }

  findShortestPath(start: string, destination: string) {
    const shortest_paths_map = alg.dijkstra(this.graph, start, e => this.graph.edge(e.v, e.w).weight, v => this.graph.nodeEdges(v) || []);

    let shortest_path = [] as { start: string; destination: string; distance: number; }[];
    let current = destination;

    while (current !== start) {
      let predecessor = shortest_paths_map[current].predecessor;
      shortest_path.push({ start: current, destination: predecessor, distance: shortest_paths_map[current].distance - shortest_paths_map[predecessor].distance});
      current = predecessor;
    }

    return shortest_path;
  }

  async selectTicketCards(game: Game) {
    const items = Array.from({ length: this.proposedTicketCards.length }).map((_, i) => i);
    let combinations = this.uniqueCombinations(items);
    combinations = combinations.filter(c => c.length > 1);
    
    let best_selections = [] as { ticket_card_idxs: number[], routes: Route[] }[][];
    
    for (const ticket_card_idxs of combinations) {
      const city_names_in_combo = ticket_card_idxs.map(ticket_idx => [this.proposedTicketCards[ticket_idx].start, this.proposedTicketCards[ticket_idx].destination]).flat();
      const set = new Set<string>();
      city_names_in_combo.forEach(name => set.add(name));
      const tree = await find_steiner_tree(this.graph, Array.from(set));

      if (tree) {
        const routes = tree.edges().map(e => this.findRoute(game, e.v, e.w) as Route);
        best_selections.push([{ ticket_card_idxs, routes }]);
      } else {
        const selection = [] as { ticket_card_idxs: number[], routes: Route[] }[];
        ticket_card_idxs.forEach(ticket_idx => {
          const ticket_card = this.proposedTicketCards[ticket_idx];
          const shortest_path = this.findShortestPath(ticket_card.start, ticket_card.destination);
          const route = shortest_path.map(p => this.findRoute(game, p.start, p.destination) as Route);
          selection.push({ ticket_card_idxs: [ticket_idx], routes: route });
        });

        best_selections.push(selection);
      }
    }
      
    let best_selection = best_selections[0];
    let best_points_per_train = Infinity;

    best_selections.forEach(selection => {
      let total_points = 0;
      let total_weight = 0;

      selection.forEach(ideal_route => {
        ideal_route.routes.forEach(r => {
          const weight = r.path.length;
          const points = ROUTE_LENGTH_TO_POINTS[weight];
          total_points += points;
          total_weight += weight;
        });
      });

      const ticket_points = selection.map(s => s.ticket_card_idxs).flat().reduce((sum, ticket_idx) => sum + this.proposedTicketCards[ticket_idx].points, 0);
      const points_per_train = (total_points + ticket_points) / total_weight;

      if (points_per_train > best_points_per_train) {
        best_selection = selection;
      }
    });

    const ids_to_keep = best_selection.map(s => s.ticket_card_idxs).flat().map(c => this.proposedTicketCards[c].id);
    this.desiredRoutes = best_selection.map(s => ({ ticket_ids: s.ticket_card_idxs.map(idx => this.proposedTicketCards[idx].id), route: s.routes }));
    game.keepTicketCards(this.id, ids_to_keep);
  }

  selectMoreTicketCards(game: Game) {
    game.proposeTicketCards(this.id);
    game.keepTicketCards(this.id, [this.proposedTicketCards[0].id]);
  }

  uniqueCombinations(items: number[]) {
    const result: number[][] = [];
  
    for (let r = 1; r <= items.length; r++) {
      this.generateCombinations(items, r, 0, [], result);
    }
  
    return result;
  }
  
  generateCombinations(items: number[], r: number, start: number, current: number[], result: number[][]) {
    if (current.length === r) {
      result.push([...current]);
      return;
    }
  
    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      this.generateCombinations(items, r, i + 1, current, result);
      current.pop();
    }
  } 

  updateGraph(game: Game) {
    game.routes.forEach(r => {
      if (this.graph.hasEdge(r.start, r.destination) && ((r.claimed_player_id !== undefined && r.claimed_player_id !== this.id) || r.disabled)) {
        this.graph.removeEdge(r.start, r.destination);
      }
    });
  }

  removeDuplicateDesiredRoutes() {
    const unique_routes = new Set<string>();

    const new_desired_routes = [] as IdealRoute[];

    for (const route_collection of this.desiredRoutes) {
      const new_ideal_route = {  ticket_ids: route_collection.ticket_ids, route: [] as Route[] };

      route_collection.route.forEach(r => {
        if (!unique_routes.has(r.id)) {
          new_ideal_route.route.push(r);
        }
        unique_routes.add(r.id);
      });

      new_desired_routes.push(new_ideal_route);
    }

    this.desiredRoutes = new_desired_routes;
  }

  async updateDesiredRoutes(game: Game) {
    this.removeDuplicateDesiredRoutes();

    const updated_desired_routes = [] as IdealRoute[];

    if (this.desiredRoutes.length === 0) return;
    
    for (const route_collection of this.desiredRoutes) {
      let new_routes = [] as Route[];

      if (route_collection.route.length === 0) {
        continue;
      }
      
      for (const route of route_collection.route) {
        const route_claimed = route.claimed_player_id !== undefined;
        if (route_claimed || route.disabled) {
          console.log(`desired route no longer available: ${route.start} - ${route.destination}`)
          this.graph.removeEdge(route.start, route.destination);

          console.log(`looking for tree between ${route.start} and ${route.destination}`)
          const tree = await find_steiner_tree(this.graph, [route.start, route.destination]);
          if (tree) {
            console.log(JSON.stringify(tree.edges(), undefined, 4))
            const routes = tree.edges().map(e => this.findRoute(game, e.v, e.w) as Route);
            routes.forEach(r => {
              if (!route_collection.route.map(r => r.id).includes(r.id)) {
                new_routes.push(r);
              }
            });

            console.log('found alternate route')
            console.log(JSON.stringify(routes, undefined, 4))
          } else {
            const set = new Set<string>();
            route_collection.route.forEach(r => {
              set.add(r.start);
              set.add(r.destination);
            });
            console.log(route_collection);

            const tree = await find_steiner_tree(this.graph, Array.from(set));
            console.log('replacing entire route')
            if (tree) {
              const routes = tree.edges().map(e => this.findRoute(game, e.v, e.w) as Route);
              new_routes = routes;
            } else {
              console.log('using shortest path instead')
              const shortest_path = this.findShortestPath(route.start, route.destination);
              if (shortest_path.length === 0) {
                new_routes = [];
              } else {
                new_routes = shortest_path.map(p => this.findRoute(game, p.start, p.destination) as Route);
              }
            }
            break;
          }
        } else {
          new_routes.push(route);
        }
      }

      if (new_routes.length > 0) {
        updated_desired_routes.push({ ticket_ids: route_collection.ticket_ids, route: new_routes });
      }
    }

    this.desiredRoutes = updated_desired_routes;

    this.removeDuplicateDesiredRoutes();

    console.log('updated desired routes');
    console.log(JSON.stringify(this.desiredRoutes, undefined, 4))
  }

  determineColorForWildRoute(numCardsNeeded: number) {
    const numWildCards = this.trainCarCards.filter(c => c.color === Color.Wild).length;

    const colorCounts = this.trainCarCards.reduce((res, c) => {
      if (c.color === Color.Wild) return res;

      if (!res[c.color]) {
        res[c.color] = 0;
      }

      res[c.color] += 1;
      return res;
    }, {});

    const colorsToClaimRouteWith = Object.keys(colorCounts).filter(color => colorCounts[color] + numWildCards >= numCardsNeeded);
    
    if (numWildCards >= numCardsNeeded) {
      colorsToClaimRouteWith.push(Color.Wild);
    }

    if (colorsToClaimRouteWith.length === 1) {
      return colorsToClaimRouteWith[0];
    }

    const mapOfColorsNeeded = this.desiredRoutes.map(r => r.route).flat().reduce((res, c) => {
      if (c.color === Color.Wild) return res;

      if (!res[c.color]) {
        res[c.color] = 0;
      }

      res[c.color] += c.path.length;
      return res;
    }, {});

    this.trainCarCards.forEach(c => {
      if (Object.keys(mapOfColorsNeeded).includes(c.color)) {
        mapOfColorsNeeded[c.color] -= 1;
      }
    });

    const filtered = Object.fromEntries(Object.entries(mapOfColorsNeeded).filter(([key, val]) => colorsToClaimRouteWith.includes(key))) as Record<string, number>;

    if (Object.keys(filtered).length === 0) {
      if (colorsToClaimRouteWith.length > 1 && colorsToClaimRouteWith.includes(Color.Wild)) {
        return randomElementFromArr(colorsToClaimRouteWith.filter(c => c !== Color.Wild));
      }
      return randomElementFromArr(colorsToClaimRouteWith);
    }

    const minKey = Object.entries(filtered).reduce((min, [key, value]) => 
      value < filtered[min] ? key : min
    , Object.keys(filtered)[0]);

    return minKey;
  }

  getClaimableRoute() {
    return this.desiredRoutes[0].route.find(r => {
      const numWildCards = this.trainCarCards.filter(c => c.color === Color.Wild).length;

      if (r.color === Color.Wild) {
        const colorCounts = this.trainCarCards.reduce((res, c) => {
          if (c.color === Color.Wild) return res;
  
          if (!res[c.color]) {
            res[c.color] = 0;
          }
  
          res[c.color] += 1;
          return res;
        }, {} as Record<string, number>);

        return Math.max(...Object.values(colorCounts)) + numWildCards >= r.path.length;
      } else {
        return (this.trainCarCards.filter(c => c.color === r.color).length + numWildCards) >= r.path.length;
      }
    });
  }

  async performTurn(game: Game) {
    this.updateGraph(game);

    if (this.ticketCards.every(c => c.complete) || this.desiredRoutes.length === 0) {
      game.proposeTicketCards(this.id);
      this.selectMoreTicketCards(game);
      game.emit(game.id);
    } else {
      await this.updateDesiredRoutes(game);

      if (this.desiredRoutes.length === 0) {
        console.log('no desired routes');
        return;
      }
      const first_ideal_route = this.desiredRoutes[0];

      const claimableRoute = this.getClaimableRoute();
      if (claimableRoute) {
        await this.wait(3000);
        if (claimableRoute.color === Color.Wild) {
          const color_to_claim_with = this.determineColorForWildRoute(claimableRoute.path.length) as Color;
          game.claimRoute(claimableRoute.id, color_to_claim_with);
        } else {
          game.claimRoute(claimableRoute.id);
        }
        this.desiredRoutes[0].route = this.desiredRoutes[0].route.filter(r => r.id !== claimableRoute.id);
        if (this.desiredRoutes[0].route.length === 0) {
          this.desiredRoutes = this.desiredRoutes.slice(1, this.desiredRoutes.length);
        }

        console.log('routes after claiming')
        console.log(JSON.stringify(this.desiredRoutes, undefined, 4));
        game.emit(game.id);
      } else {
        const colors_needed = first_ideal_route.route.filter(r => r.color !== Color.Wild).map(r => r.color);

        let found_card = false;
        for (const available_card of game.faceUpTrainCarCards) {
          if (colors_needed.includes(available_card.color)) {
            await this.wait(3000);
            let kept_card = game.keepTrainCarCard(this.id, available_card.id);
            game.emit(game.id);
            game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, available_card.id, kept_card);
            found_card = true;
            break;
          }
        }

        if (found_card) {
          found_card = false;
        } else {
          await this.wait(3000);
          let kept_card = game.keepTrainCarCard(this.id);
          game.emit(game.id);
          game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
        }

        for (const available_card of game.faceUpTrainCarCards) {
          if (colors_needed.includes(available_card.color)) {
            await this.wait(3000);
            let kept_card = game.keepTrainCarCard(this.id, available_card.id);
            game.emit(game.id);
            game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, available_card.id, kept_card);
            found_card = true;
            break;
          }
        }

        if (!found_card) {
          await this.wait(3000);
          let kept_card = game.keepTrainCarCard(this.id);
          game.emit(game.id);
          game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
        }
      }
    }
  }
}