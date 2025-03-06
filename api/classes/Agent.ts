import { Graph } from "@dagrejs/graphlib";
import { PlayerColor } from "../types";
import { Game } from "./Game";
import { Player } from "./Player";
import { ROUTE_LENGTH_TO_POINTS } from "../constants";
import { find_steiner_tree } from "./SteinerTree";

export class Agent extends Player {
  constructor(id: string, username: string, color: PlayerColor = PlayerColor.RED) {
    super(id, username, color);
    this.type = 'Agent';
  }

  wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectTicketCards(game: Game) {
    const items = Array.from({ length: this.proposedTicketCards.length }).map((_, i) => i);
    let combinations = this.uniqueCombinations(items);
    combinations = combinations.filter(c => c.length > 1);
    
    let best_path_trees = [] as { combo: number[], tree: Graph }[];
    
    combinations.forEach(combo => {
      const city_names_in_combo = combo.map(ticket_idx => [this.proposedTicketCards[ticket_idx].start, this.proposedTicketCards[ticket_idx].destination]).flat();
      console.log(city_names_in_combo);
      const tree = find_steiner_tree(game.graph, city_names_in_combo);
      if (tree) {
        best_path_trees.push({ combo, tree });
      }
    });

    let best_combo = combinations[0];
    let best_points_per_train = Infinity;

    best_path_trees.forEach(tree => {
      let total_points = 0;
      let total_weight = 0;

      tree.tree.edges().forEach(e => {
        const weight = tree.tree.edge(e).weight;
        const points = ROUTE_LENGTH_TO_POINTS[weight];
        total_points += points;
        total_weight += weight;
      });

      const ticket_points = tree.combo.reduce((sum, ticket_idx) => sum + this.proposedTicketCards[ticket_idx].points, 0);
      const points_per_train = (total_points + ticket_points) / total_weight;

      if (points_per_train < best_points_per_train) {
        best_combo = tree.combo;
        best_points_per_train = points_per_train;
      }
    });

    const ids_to_keep = best_combo.map(c => this.proposedTicketCards[c].id);
    game.keepTicketCards(this.id, ids_to_keep);
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

  async performTurn(game: Game) {
    await this.wait(3000);
    let kept_card = game.keepTrainCarCard(this.id);
    game.emit(game.id);
    game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
    
    await this.wait(3000);
    kept_card = game.keepTrainCarCard(this.id);
    game.emit(game.id);
    game.emitOnOtherPlayerKeepTrainCarCard(game.id, this.id, undefined, kept_card);
  }
}