import { parentPort, workerData } from "worker_threads";
import { brute_force_steiner_tree } from "./SteinerTree";
import { Graph } from "@dagrejs/graphlib";

const { nodes, edges, vertices } = workerData;
const graph = new Graph({ directed: false });

nodes.forEach(node => {
  graph.setNode(node);
});

edges.forEach(edge => {
  graph.setEdge(edge.v, edge.w, { weight: edge.weight })
});

try {
  const result = brute_force_steiner_tree(graph, vertices);
  parentPort?.postMessage({ success: true, result });
} catch (error) {
  parentPort?.postMessage({ success: false, error });
}
