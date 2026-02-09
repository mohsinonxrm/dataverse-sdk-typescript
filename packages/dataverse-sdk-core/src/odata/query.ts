export interface QueryState {
  $select?: string;
  $filter?: string;
  $expand?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $count?: boolean;
  $search?: string;
  $apply?: string;
}

export function buildQuery(state: QueryState): Record<string, string> {
  const q: Record<string, string> = {};
  for (const [k, v] of Object.entries(state)) {
    if (v === undefined || v === null || v === "") continue;
    q[k] = String(v);
  }
  return q;
}
