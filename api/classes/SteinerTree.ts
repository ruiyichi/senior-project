import { Graph } from "@dagrejs/graphlib";

interface WeightedEdge {
  v: string;
  w: string;
  weight: number;
}

const brute_force_steiner_tree = (graph: Graph, target_vertices: string[]) => {
  const all_vertices = graph.nodes();
  const other_vertices = all_vertices.filter(v => !target_vertices.includes(v));
  
  let best_tree: Graph | null = null;
  let best_weight = Infinity;

  const subsets = generate_subsets(other_vertices);
  
  for (const subset of subsets) {
    const vertices = [...target_vertices, ...subset];
    const subgraph = create_subgraph(graph, vertices);
    
    const mst = find_mst(subgraph);
    
    if (mst && is_connected(mst, target_vertices)) {
      const weight = get_total_weight(mst);
      
      if (weight < best_weight) {
        best_weight = weight;
        best_tree = mst;
      }
    }
  }
  
  return best_tree;
}

function generate_subsets<T>(arr: T[]): T[][] {
  const subsets: T[][] = [[]];
  
  for (const elem of arr) {
    const currentSubsetsLength = subsets.length;
    for (let i = 0; i < currentSubsetsLength; i++) {
      const new_subset = [...subsets[i], elem];
      if (new_subset.length > 5) continue;
      subsets.push(new_subset);
    }
  }
  
  return subsets;
}

function create_subgraph(graph: Graph, vertices: string[]): Graph {
  const subgraph = new Graph({ directed: false });
  
  for (const v of vertices) {
    subgraph.setNode(v, graph.node(v));
  }
  
  for (const v of vertices) {
    for (const w of vertices) {
      if (v !== w && graph.hasEdge(v, w)) {
        const weight = graph.edge(v, w).weight;
        subgraph.setEdge(v, w, { weight });
      }
    }
  }
  
  return subgraph;
}

const find_mst = (graph: Graph) => {
  const mst = new Graph({ directed: false });
  const vertices = graph.nodes();
  
  if (vertices.length <= 1) {
    return null;
  }
  
  for (const v of vertices) {
    mst.setNode(v, graph.node(v));
  }
  
  const edges: WeightedEdge[] = [];
  graph.edges().forEach(e => {
    edges.push({
      v: e.v,
      w: e.w,
      weight: graph.edge(e).weight
    });
  });
  
  edges.sort((a, b) => a.weight - b.weight);
  
  const disjointSet = new DisjointSet(vertices);
  
  for (const edge of edges) {
    const { v, w, weight } = edge;
    
    if (disjointSet.find(v) !== disjointSet.find(w)) {
      mst.setEdge(v, w, { weight });
      disjointSet.union(v, w);
    }
  }
  
  return mst;
}

const is_connected = (graph: Graph, target_vertices: string[]) => {
  if (target_vertices.length <= 1) return true;
  
  const visited = new Set<string>();
  const queue: string[] = [target_vertices[0]];
  visited.add(target_vertices[0]);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    const neighbors = graph.neighbors(current) || [];
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return target_vertices.every(t => visited.has(t));
}

const get_total_weight = (graph: Graph) => {
  let totalWeight = 0;
  
  graph.edges().forEach(e => {
    totalWeight += graph.edge(e).weight;
  });
  
  return totalWeight;
}

class DisjointSet {
  private parent: Map<string, string>;
  
  constructor(elements: string[]) {
    this.parent = new Map();
    
    for (const element of elements) {
      this.parent.set(element, element);
    }
  }
  
  find(x: string): string {
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!));
    }
    return this.parent.get(x)!;
  }
  
  union(x: string, y: string): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX !== rootY) {
      this.parent.set(rootX, rootY);
    }
  }
}

export const find_steiner_tree = (graph: Graph, vertices: string[]) => {
  return brute_force_steiner_tree(graph, vertices);
}