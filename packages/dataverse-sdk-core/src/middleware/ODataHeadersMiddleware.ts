import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { normalizeHeaders } from "../utils/HeaderUtils.js";
import { isJsonBody } from "../utils/body.js";

export class ODataHeadersMiddleware implements Middleware {
  name = "ODataHeadersMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    _ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const headers: Record<string, string> = {
      "odata-maxversion": "4.0",
      "odata-version": "4.0",
      ...normalizeHeaders(this.options.defaultHeaders),
      // Caller headers win over defaults. Names are already lower-cased by DataverseClient.send(),
      // but normalise again so the middleware is safe to use on its own.
      ...normalizeHeaders(request.headers),
    };

    const prefer = mergePrefer(this.options.defaultPrefer, headers.prefer);
    if (prefer) headers.prefer = prefer;

    // Set Accept header only if not already set (allow override for $metadata, etc.)
    if (!headers.accept) {
      headers.accept = "application/json";
    }

    // Default content-type for bodies the SDK serialises to JSON, and for strings (usually raw JSON).
    // Binary, Blob, FormData, URLSearchParams and stream bodies are left to the caller or to fetch.
    if (
      !headers["content-type"] &&
      (isJsonBody(request.body) || typeof request.body === "string")
    ) {
      headers["content-type"] = "application/json; charset=utf-8";
    }

    request.headers = headers;
    return next(request, _ctx);
  }
}

/**
 * `defaultPrefer` plus the request's own `Prefer` header. Preferences are matched by name (the
 * part before `=`, case-insensitive), and the request's value wins.
 */
export function mergePrefer(
  defaults: readonly string[] | undefined,
  requestPrefer: string | undefined
): string | undefined {
  if (!defaults?.length) return requestPrefer;
  const own = splitPrefer(requestPrefer);
  const ownNames = new Set(own.map(preferenceName));
  const added = defaults.filter((p) => !ownNames.has(preferenceName(p)));
  const merged = [...own, ...added];
  return merged.length ? merged.join(", ") : undefined;
}

function splitPrefer(value: string | undefined): string[] {
  if (!value) return [];
  // Split on commas outside quotes: include-annotations values are quoted and may list several.
  const parts: string[] = [];
  let current = "";
  let quoted = false;
  for (const ch of value) {
    if (ch === '"') quoted = !quoted;
    if (ch === "," && !quoted) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  parts.push(current);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function preferenceName(p: string): string {
  return (p.split("=")[0] ?? p).split(";")[0]?.trim().toLowerCase() ?? "";
}
