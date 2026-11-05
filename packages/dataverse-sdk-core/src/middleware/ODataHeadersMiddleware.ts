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
