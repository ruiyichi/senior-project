import { Graph } from "@dagrejs/graphlib";
import { PlayerColor, TicketCard } from "../types";
import { Game } from "./Game";
import { Player } from "./Player";
import { ICompare, PriorityQueue } from "@datastructures-js/priority-queue";

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
    console.log(this.proposedTicketCards)

    const combo_lengths: { combo: number[], length: number }[] = [];

    combinations.forEach(combo => {
      let paths = [] as { start: string; destination: string; distance: number; }[];
      combo.forEach(i => {
        const v = this.proposedTicketCards[i];
        const shortest_paths = game.shortestPath(v.start);

        let current = v.destination;

        while (current !== v.start) {
          let predecessor = shortest_paths[current].predecessor;
          paths.push({ start: current, destination: predecessor, distance: shortest_paths[current].distance - shortest_paths[predecessor].distance});
          current = predecessor;
        }
      });

      console.log(paths);

      const reduced_graph = new Graph();
      paths.forEach(r => {
        if (!reduced_graph.hasNode(r.destination)) {
          reduced_graph.setNode(r.destination)
        }

        if (!reduced_graph.hasNode(r.start)) {
          reduced_graph.setNode(r.start);
        }

        reduced_graph.setEdge(r.start, r.destination, r.distance);
        reduced_graph.setEdge(r.destination, r.start, r.distance);
      });

      console.log(combo); 
      const mst = this.primMST(reduced_graph);

      let length = 0;
      for (const connected_component of mst) {
        for (const path of connected_component) {
          length += path[2];
        }
      }
      combo_lengths.push({ combo, length });
      console.log(mst);
    });
    
    let min_combo_length = 99999;
    let combo_to_use = combo_lengths[0].combo;
    for (const combo_length of combo_lengths) {
      if (combo_length.length < min_combo_length) {
        min_combo_length = combo_length.length;
        combo_to_use = combo_length.combo;
      }
    }

    console.log('using combo: ' + combo_to_use);
    const ids_to_keep = combo_to_use.map(c => this.proposedTicketCards[c].id);
    game.keepTicketCards(this.id, ids_to_keep);
  }

  primMST(graph: Graph) {
    const mst: [string, string, number][][] = [];
    const visited = new Set<string>();
    const all_nodes = graph.nodes();

    const comparison: ICompare<[number, string, string]> = (a, b) => {
      return a[0] - b[0];
    }

    for (const start_node of all_nodes) {
      if (visited.has(start_node)) continue;

      const current_component: [string, string, number][] = [];

      const pq = new PriorityQueue(comparison);
      pq.enqueue([0, start_node, ""]);

      while (pq.size() > 0) {
        const [weight, node, prev] = pq.dequeue() as [number, string, string];
  
        if (visited.has(node)) continue;
        visited.add(node);
  
        if (prev !== "") {
          current_component.push([prev, node, weight]);
        }
  
        const neighbors = graph.nodeEdges(node) || [];
        for (const edge of neighbors) {
          const neighbor = edge.w === node ? edge.v : edge.w;
          if (!visited.has(neighbor)) {
            pq.enqueue([graph.edge(edge.v, edge.w) as number, neighbor, node]);
          }
        }
      }

      if (current_component.length > 0) {
        mst.push(current_component);
      }
    }

    return mst;
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