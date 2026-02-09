import type { RequestInformation } from "../abstractions/http.js";

export function normalizeBaseUrl(input: string, apiVersion: "v9.2" = "v9.2"): string {
  const trimmed = input.replace(/\/$/, "");
  if (/\/api\/data\/v\d+\.\d+$/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}/api/data/${apiVersion}`;
}

export function buildUrl(req: RequestInformation): string {
  const u = new URL(req.url);
  if (req.query) {
    for (const [k, v] of Object.entries(req.query)) {
      if (v === undefined || v === null) continue;
      u.searchParams.set(k, String(v));
    }
  }
  return u.toString();
}
