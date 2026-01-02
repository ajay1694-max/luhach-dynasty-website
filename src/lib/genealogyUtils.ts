
export interface PersonRecord {
  id: string;
  v: string; // Village
  n: string; // Name
  fn: string | null; // Father Name
  fid: string | null; // Father ID
  g: string | null; // Generation
  m: string | null; // Migration/Notes
}

export function findPath(records: PersonRecord[], startId: string, targetId: string) {
  const nodeMap = new Map<string, PersonRecord>();
  records.forEach((r) => nodeMap.set(r.id, r));

  const getAncestors = (startNode: PersonRecord) => {
    const path: PersonRecord[] = [startNode];
    let curr = startNode;
    const visited = new Set<string>();
    visited.add(curr.id);

    while (curr.fid && nodeMap.has(curr.fid) && !visited.has(curr.fid)) {
      const father = nodeMap.get(curr.fid)!;
      path.push(father);
      visited.add(father.id);
      curr = father;
    }
    
    // Fallback: If no Father ID link, try matching by Name + Gen-1 in same village
    if (!curr.fid && curr.fn && curr.g) {
        const fatherGen = (parseInt(curr.g) - 1).toString();
        const father = records.find(r => 
            r.n.toLowerCase() === curr.fn?.toLowerCase() && 
            r.g === fatherGen && 
            r.v === curr.v
        );
        if (father && !visited.has(father.id)) {
            path.push(father);
        }
    }
    
    return path;
  };

  const startNode = nodeMap.get(startId);
  const targetNode = nodeMap.get(targetId);

  if (!startNode || !targetNode) return null;

  const pathA = getAncestors(startNode);
  const pathB = getAncestors(targetNode);

  // Find LCA
  let lca: PersonRecord | null = null;
  const setA = new Set(pathA.map((r) => r.id));
  for (const node of pathB) {
    if (setA.has(node.id)) {
      lca = node;
      break;
    }
  }

  if (!lca) return null;

  // Construct full path: Start -> ... -> LCA -> ... -> Target
  const startToLca: PersonRecord[] = [];
  for (const node of pathA) {
    startToLca.push(node);
    if (node.id === lca.id) break;
  }

  const targetToLca: PersonRecord[] = [];
  for (const node of pathB) {
    targetToLca.push(node);
    if (node.id === lca.id) break;
  }
  
  // Combine: [Start, ..., LCA, ..., Target]
  // targetToLca is [Target, ..., LCA], so reverse it and remove LCA (already in startToLca)
  const lcaToTarget = [...targetToLca].reverse().slice(1);
  
  return [...startToLca, ...lcaToTarget];
}

export function searchPersons(records: PersonRecord[], query: string, limit = 5) {
  const q = query.toLowerCase();
  return records
    .filter((r) => 
        r.n.toLowerCase().includes(q) || 
        r.v.toLowerCase().includes(q)
    )
    .slice(0, limit);
}
