import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";

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
      ...lowercaseKeys(this.options.defaultHeaders),
      ...request.headers,
    };

    // Set Accept header only if not already set (allow override for $metadata, etc.)
    if (!headers.accept && !headers.Accept) {
      headers.accept = "application/json";
    }

    // If body present, set content-type unless user set it
    if (request.body !== undefined && !headers["content-type"]) {
      headers["content-type"] = "application/json; charset=utf-8";
    }

    request.headers = headers;
    return next(request, _ctx);
  }
}

function lowercaseKeys(h?: Record<string, string>): Record<string, string> {
  if (!h) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(h)) out[k.toLowerCase()] = v;
  return out;
}
