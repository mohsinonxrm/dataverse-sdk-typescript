export function mergeHeaders(
  ...sets: Array<Record<string, string> | undefined>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const s of sets) {
    if (!s) continue;
    for (const [k, v] of Object.entries(s)) {
      out[k.toLowerCase()] = v;
    }
  }
  return out;
}

export function setHeader(headers: Record<string, string>, name: string, value: string): void {
  headers[name.toLowerCase()] = value;
}

export function getHeader(headers: Headers, name: string): string | null {
  return headers.get(name);
}
