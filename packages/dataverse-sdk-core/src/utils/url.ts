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

/**
 * The request URL with `req.query` added.
 *
 * Values are encoded with `encodeURIComponent` (a space is `%20`, not `+`), keeping the characters
 * OData writes literally (`$ ' ( ) , / : @ =`), so URLs read like Microsoft's examples:
 * `$filter=name%20eq%20'O''Brien'`. (Parsing the URL with `new URL()`, as `fetch` does, writes
 * `'` as `%27`; Dataverse reads both.) A query string already in `req.url` is kept exactly as the
 * caller encoded it; only a parameter that `req.query` sets again is replaced (#52).
 */
export function buildUrl(req: RequestInformation): string {
  const u = new URL(req.url);
  const entries = Object.entries(req.query ?? {}).filter(
    (e): e is [string, string | number | boolean] => e[1] !== undefined && e[1] !== null
  );
  if (entries.length === 0) return u.toString();

  const names = new Set(entries.map(([name]) => name));
  const kept = u.search
    .slice(1)
    .split("&")
    .filter((pair) => pair !== "" && !names.has(decodeQueryName(pair)));
  const added = entries.map(
    ([name, value]) => `${encodeQueryPart(name)}=${encodeQueryPart(String(value))}`
  );
  const beforeQuery = u.href.slice(0, u.href.length - u.search.length - u.hash.length);
  return `${beforeQuery}?${[...kept, ...added].join("&")}${u.hash}`;
}

/** `encodeURIComponent`, then the characters OData writes literally put back. */
function encodeQueryPart(text: string): string {
  return encodeURIComponent(text).replace(/%(?:24|2C|2F|3A|40|3D)/gi, decodeURIComponent);
}

/** The decoded name of a `name=value` pair (form rules: `+` is a space). */
function decodeQueryName(pair: string): string {
  const raw = pair.split("=", 1)[0] ?? "";
  try {
    return decodeURIComponent(raw.replace(/\+/g, " "));
  } catch {
    return raw;
  }
}
