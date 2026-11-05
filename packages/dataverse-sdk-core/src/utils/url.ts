import type { RequestInformation } from "../abstractions/http.js";
import type { ApiVersion } from "../abstractions/options.js";

export function normalizeBaseUrl(input: string, apiVersion: ApiVersion = "v9.2"): string {
  const trimmed = input.replace(/\/$/, "");
  if (/\/api\/data\/v\d+\.\d+$/i.test(trimmed)) {
    return trimmed;
  }
  return `${trimmed}/api/data/${apiVersion}`;
}

/**
 * Resolve a request path against the Web API root. Absolute `http(s)://` URLs are returned
 * unchanged; anything else is treated as relative to `apiRoot`, with or without a leading `/`.
 *
 * @example
 * ```typescript
 * resolveRequestUrl("https://org.crm.dynamics.com/api/data/v9.2", "WhoAmI");
 * // "https://org.crm.dynamics.com/api/data/v9.2/WhoAmI"
 * ```
 */
export function resolveRequestUrl(apiRoot: string, pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const root = apiRoot.endsWith("/") ? apiRoot.slice(0, -1) : apiRoot;
  return `${root}/${pathOrUrl.replace(/^\/+/, "")}`;
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
