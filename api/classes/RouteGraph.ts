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
    console.log(connected_components)
    for (let i = 0; i < connected_components.length; i++) {
      const component = connected_components[i];
      if (component.includes(start) && component.includes(destination)) {
        return true;
      }
    }
    return false;
  }

  longestPathLength() {
    return 0;
  }
}
