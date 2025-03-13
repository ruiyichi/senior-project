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
    const route = this.findRoute(start, destination);
    if (route) {
      this.graph.setEdge(start, destination, { weight: route.path.length });
    }
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
  
    const dfs = (currentCity: string, currentPathLength: number, visited: Set<string>) => {
      if (currentPathLength > longestPath) {
        longestPath = currentPathLength;
      }
  
      for (const neighbor of graph.neighbors(currentCity) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          
          const edgeWeight = this.findRoute(currentCity, neighbor)?.path.length;
          
          dfs(neighbor, currentPathLength + edgeWeight!, visited);
          
          visited.delete(neighbor);
        }
      }
    };
  
    for (const startCity of graph.nodes()) {
      const visited = new Set<string>();
      visited.add(startCity);
      dfs(startCity, 0, visited);
    }
  
    return longestPath;
  }
}
