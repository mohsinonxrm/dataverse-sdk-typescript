import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { normalizeHeaders } from "../utils/HeaderUtils.js";

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

    // Set Accept header only if not already set (allow override for $metadata, etc.)
    if (!headers.accept) {
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
