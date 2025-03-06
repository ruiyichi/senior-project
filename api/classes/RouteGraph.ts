import { Graph, alg } from "@dagrejs/graphlib";
import { TRAIN_ROUTES } from "../constants";

export class RouteGraph {
  graph: Graph;

  constructor() {
    this.graph = new Graph();
    TRAIN_ROUTES.forEach(r => {
      if (!this.graph.hasNode(r.destination)) {
        this.graph.setNode(r.destination)
      }
      if (!this.graph.hasNode(r.start)) {
        this.graph.setNode(r.start);
      }
    });
  }

  addRoute(start: string, destination: string) {
    this.graph.setEdge(start, destination);
  }

  hasPath(start: string, destination: string) {
    const connected_components = alg.components(this.graph);
    for (let i = 0; i < connected_components.length; i++) {
      const component = connected_components[i];
      if (component.includes(start) && component.includes(destination)) {
        return true;
      }
    }
    return false;
  }

  findRoute(first_city: string, second_city: string) {
    return TRAIN_ROUTES.find(r => (r.start === first_city && r.destination === second_city) || (r.start === second_city && r.destination === first_city));
  }

  longestPathLength() {
    let longestPath = 0;
    const graph = this.graph;

    const dfs = (city: string, path: string[], visited: Set<string>) => {
      visited.add(city);
      let path_length = 0;
      if (path.length > 1) {
        for (let i = 0; i < path.length; i++) {
          if (i + 1 === path.length) continue;
          const first_city = path[i];
          const second_city = path[i + 1];
          path_length += this.graph.edge(first_city, second_city);
        }
      }
      
      if (path_length > longestPath) {
        longestPath = path_length;
      }

      for (const neighbor of graph.neighbors(city) || []) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, [...path, neighbor], visited);
        }
      }
      visited.delete(city);
    }

    for (const city of graph.nodes()) {
      dfs(city, [city], new Set());
    }

    return longestPath;
  }
}
