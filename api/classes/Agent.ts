import { Graph, alg } from "@dagrejs/graphlib";
import { Color, PlayerColor, Route, TicketCard } from "../types";
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

    console.log('ticket cards')
    console.log(this.proposedTicketCards.filter(c => ids_to_keep.includes(c.id)));

    game.keepTicketCards(this.id, ids_to_keep);
  }

  selectMoreTicketCards(game: Game) {
    game.proposeTicketCards(this.id);

    if (this.proposedTicketCards.length === 0) {
      game.nextTurn();
      return;
    }

    const ticket_cards_to_select = [] as TicketCard[];
    const possible_ticket_cards = [] as { ticket_id: string, points_per_train_car: number, edges: [string, string][] }[];

    this.proposedTicketCards.forEach(ticket => {
      if (this.routeGraph.hasPath(ticket.start, ticket.destination)) {
        ticket_cards_to_select.push(ticket);
      }

      const shortest_path_to_ticket_start = this.iterativeDeepening(this.routeGraph.graph, this.graph, ticket.start, 5);
      if (!shortest_path_to_ticket_start) {
        return;
      }
      
      const shortest_path_to_ticket_dest = this.iterativeDeepening(this.routeGraph.graph, this.graph, ticket.destination, 5);
      if (!shortest_path_to_ticket_dest) {
        return;
      }

      if (this.numTrainCars < (shortest_path_to_ticket_start.totalWeight + shortest_path_to_ticket_dest.totalWeight)) {
        return;
      }

      possible_ticket_cards.push({ 
        ticket_id: ticket.id,
        points_per_train_car: (
          shortest_path_to_ticket_dest.bestPointsPerTrainCar * shortest_path_to_ticket_dest.totalWeight + 
          shortest_path_to_ticket_start.bestPointsPerTrainCar * shortest_path_to_ticket_start.totalWeight +
          ticket.points
        ) / (shortest_path_to_ticket_dest.totalWeight + shortest_path_to_ticket_start.totalWeight), 
        edges: [...shortest_path_to_ticket_dest.unclaimedEdges, ...shortest_path_to_ticket_start.unclaimedEdges]
      });
    });
      
    if (possible_ticket_cards.length === 0) {
      if (ticket_cards_to_select.length === 0) {
        const ticket_card_with_min_points = this.proposedTicketCards.reduce((min, ticket) => (ticket.points < min.points ? ticket : min), this.proposedTicketCards[0]);
        ticket_cards_to_select.push(ticket_card_with_min_points);
      }

      console.log('already completed ticket cards')
      console.log(this.proposedTicketCards);
      console.log(ticket_cards_to_select)
      game.keepTicketCards(this.id, ticket_cards_to_select.map(t => t.id));
      return;
    }

    const most_points_scored_per_train_car = 0;
    let best_ticket = possible_ticket_cards[0];
    for (const possible_ticket_card of possible_ticket_cards) {
      if (possible_ticket_card.points_per_train_car > most_points_scored_per_train_car) {
        best_ticket = possible_ticket_card;
      }
    }

    const ticket_card_to_add = this.proposedTicketCards.find(t => t.id === best_ticket.ticket_id);
    if (ticket_card_to_add) {
      ticket_cards_to_select.push(ticket_card_to_add);

      const route_objects = [] as Route[];
      best_ticket.edges.forEach(e => {
        const route = this.findRoute(game, e[0], e[1]);
        if (route) {
          route_objects.push(route);
        }
      });

      this.desiredRoutes.push({
        ticket_ids: [ticket_card_to_add.id],
        route: route_objects
      });
    }

    console.log('more ticket cards')
    console.log(ticket_cards_to_select)

    game.keepTicketCards(this.id, ticket_cards_to_select.map(t => t.id));
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
      if (this.graph.hasEdge(r.start, r.destination) && (r.claimed_player_id !== undefined || r.disabled)) {
        this.graph.removeEdge(r.start, r.destination);
      }
    });
  }

  removeDuplicateDesiredRoutes() {
    const unique_route_ids = new Set<string>();

    const new_desired_routes = [] as IdealRoute[];

    for (const route_collection of this.desiredRoutes) {
      const new_ideal_route = {  ticket_ids: route_collection.ticket_ids, route: [] as Route[] };

      route_collection.route.forEach(r => {
        if (!unique_route_ids.has(r.id)) {
          new_ideal_route.route.push(r);
        }
        unique_route_ids.add(r.id);
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
          this.graph.removeEdge(route.start, route.destination);

          const tree = await find_steiner_tree(this.graph, [route.start, route.destination]);
          if (tree) {
            const routes = tree.edges().map(e => this.findRoute(game, e.v, e.w) as Route);
            routes.forEach(r => {
              if (!route_collection.route.map(r => r.id).includes(r.id)) {
                new_routes.push(r);
              }
            });

          } else {
            const set = new Set<string>();
            route_collection.route.forEach(r => {
              set.add(r.start);
              set.add(r.destination);
            });

            const tree = await find_steiner_tree(this.graph, Array.from(set));
            if (tree) {
              const routes = tree.edges().map(e => this.findRoute(game, e.v, e.w) as Route);
              new_routes = routes;
            } else {
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
      await this.wait(2000);
      this.selectMoreTicketCards(game);
      this.removeDuplicateDesiredRoutes();
      game.emit(game.id);
    } else {
      await this.updateDesiredRoutes(game);

      if (this.desiredRoutes.length === 0) {
        console.log('no desired routes');
        game.nextTurn();
        game.emit(game.id);
        return;
      }
      console.log(this.desiredRoutes)
      const first_ideal_route = this.desiredRoutes[0];

      const claimableRoute = this.getClaimableRoute();
      if (claimableRoute) {
        await this.wait(2000);
        if (claimableRoute.color === Color.Wild) {
          const color_to_claim_with = this.determineColorForWildRoute(claimableRoute.path.length) as Color;
          const res = game.claimRoute(claimableRoute.id, color_to_claim_with);
          if (!res) {
            console.log(JSON.stringify(this.desiredRoutes, undefined, 4));
          }
        } else {
          const res = game.claimRoute(claimableRoute.id);
          if (!res) {
            console.log(JSON.stringify(this.desiredRoutes, undefined, 4));
          }
        }
        this.desiredRoutes[0].route = this.desiredRoutes[0].route.filter(r => r.id !== claimableRoute.id);
        if (this.desiredRoutes[0].route.length === 0) {
          this.desiredRoutes = this.desiredRoutes.slice(1, this.desiredRoutes.length);
        }

        game.emit(game.id);
      } else {
        const colors_needed = first_ideal_route.route.filter(r => r.color !== Color.Wild).map(r => r.color);

        let found_card = false;
        for (const available_card of game.faceUpTrainCarCards) {
          if (colors_needed.includes(available_card.color)) {
            await this.wait(2000);
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
          await this.wait(2000);
          let kept_card = game.keepTrainCarCard(this.id);
          game.emit(game.id);
          game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
        }

        for (const available_card of game.faceUpTrainCarCards) {
          if (colors_needed.includes(available_card.color)) {
            await this.wait(2000);
            let kept_card = game.keepTrainCarCard(this.id, available_card.id);
            game.emit(game.id);
            game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, available_card.id, kept_card);
            found_card = true;
            break;
          }
        }

        if (!found_card) {
          await this.wait(2000);
          let kept_card = game.keepTrainCarCard(this.id);
          game.emit(game.id);
          game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
        }
      }
    }
  }

  iterativeDeepening(owned_graph: Graph, unclaimed_graph: Graph, target_node: string, max_depth: number) {
    const owned_edges = owned_graph.edges();
    const reachable_nodes_set = new Set<string>();
    owned_edges.map(e => e.v).forEach(node => reachable_nodes_set.add(node));
    owned_edges.map(e => e.w).forEach(node => reachable_nodes_set.add(node));
    const reachable_nodes = Array.from(reachable_nodes_set);
  
    if (reachable_nodes.includes(target_node)) {
      return null;
    }
    
    let depth = 1;
    
    while (depth <= max_depth) {
      let bestPath: string[] | null = null;
      let bestWeight = Number.POSITIVE_INFINITY;
      let bestPointsPerTrainCar = 0;
      let bestUnclaimedEdges: [string, string][] = [];
      
      for (const start_node of reachable_nodes) {
        type QueueEntry = [number, string, string[], [string, string][]];
        const queue: QueueEntry[] = [[0, start_node, [start_node], []]];
        const visited = new Map<string, number>();
        visited.set(start_node, 0);
        
        while (queue.length > 0) {
          queue.sort((a, b) => a[0] - b[0]);
          const [weight, current, path, unclaimedEdges] = queue.shift()!;
          
          if (weight > (visited.get(current) || Number.POSITIVE_INFINITY)) {
            continue;
          }
          
          if (current === target_node) {
            if (weight < bestWeight) {
              bestWeight = weight;
              bestPath = path;
              bestUnclaimedEdges = unclaimedEdges;
            } else if (weight === bestWeight) {
              const total_points = unclaimedEdges.reduce((sum, edges) => {
                const edge_weight = unclaimed_graph.edge(edges[0], edges[1]).weight;
                const points = ROUTE_LENGTH_TO_POINTS[edge_weight];
                return sum + points;
              }, 0);

              const total_num_train_cars = unclaimedEdges.reduce((sum, edges) => {
                return sum + unclaimed_graph.edge(edges[0], edges[1]).weight;
              }, 0);

              const points_per_train_car = total_points / total_num_train_cars;

              if (points_per_train_car > bestPointsPerTrainCar) {
                bestPointsPerTrainCar = points_per_train_car;
                bestPath = path;
                bestUnclaimedEdges = unclaimedEdges;
              }
            }
            break;
          }
          
          if (path.length >= depth) {
            continue;
          }
          
          const ownedNeighbors = owned_graph.neighbors(current) || [];
          for (const neighbor of ownedNeighbors) {
            const edgeData = owned_graph.edge(current, neighbor);
            const edgeWeight = (edgeData && edgeData.weight) || 1;
            const newWeight = weight + edgeWeight;
            
            if (newWeight < (visited.get(neighbor) || Number.POSITIVE_INFINITY)) {
              visited.set(neighbor, newWeight);
              const newPath = [...path, neighbor];
              queue.push([newWeight, neighbor, newPath, [...unclaimedEdges]]);
            }
          }
          
          const unclaimedNeighbors = unclaimed_graph.neighbors(current) || [];
          for (const neighbor of unclaimedNeighbors) {
            const edgeData = unclaimed_graph.edge(current, neighbor);
            const edgeWeight = (edgeData && edgeData.weight) || 1;
            const newWeight = weight + edgeWeight;
            
            if (newWeight < (visited.get(neighbor) || Number.POSITIVE_INFINITY)) {
              visited.set(neighbor, newWeight);
              const newPath = [...path, neighbor];
              const newUnclaimedEdges: [string, string][] = [...unclaimedEdges, [current, neighbor]];
              queue.push([newWeight, neighbor, newPath, newUnclaimedEdges]);
            }
          }
        }
      }
      
      if (bestPath !== null) {
        return {
          totalWeight: bestWeight,
          unclaimedEdges: bestUnclaimedEdges,
          bestPointsPerTrainCar
        };
      }
      
      depth++;
    }
    
    return null;
  }
}
