import { parentPort, workerData } from "worker_threads";
import { brute_force_steiner_tree } from "./SteinerTree";
import { Graph } from "@dagrejs/graphlib";

const { nodes, edges, vertices } = workerData;

const graph = new Graph({ directed: false });

nodes.forEach(node => {
  graph.setNode(node);
});

edges.forEach(edge => {
  graph.setEdge(edge.start, edge.destination, { weight: edge.weight })
});

try {
  const result = brute_force_steiner_tree(graph, vertices);
  if (result) {
    const result_data = {
      nodes: result.nodes(),
      edges: result.edges().map(e => ({
        start: e.v,
        destination: e.w,
        weight: result.edge(e.v, e.w).weight
      }))
    };
    parentPort?.postMessage({ success: true, result: result_data });
  } else {
    parentPort?.postMessage({ success: true, result });
  }
} catch (error: unknown) {
  const err = error instanceof Error ? error : new Error(String(error));
  parentPort?.postMessage({ success: false, error: { message: err.message, stack: err.stack } });
}
