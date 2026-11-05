import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { buildUrl } from "../utils/url.js";

export class LoggingMiddleware implements Middleware {
  name = "LoggingMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    // Nothing is logged unless the app passed a logger (#33).
    const logger = this.options.logger ?? ctx.logger;
    const perRequest = ctx.middlewareOptions?.get("logging");
    // This middleware only logs at debug level, so any higher per-request level silences it.
    if (
      !logger ||
      perRequest?.disable ||
      (perRequest?.logLevel && perRequest.logLevel !== "debug")
    ) {
      return next(request, ctx);
    }
    const url = this.options.logging?.fullUrls ? buildUrl(request) : redactedUrl(request);
    const start = Date.now();
    logger.debug(`➡️ ${request.method} ${url}`, { attempt: ctx.attempt });
    const res = await next(request, ctx);
    const ms = Date.now() - start;
    logger.debug(`⬅️ ${String(res.status)} ${request.method} ${url} (${String(ms)}ms)`, {
      attempt: ctx.attempt,
      status: res.status,
      durationMs: ms,
    });
    return res;
  }
}

/**
 * Origin and path only: key values in parentheses become `(…)` and any query becomes `?…`, so
 * filters, record ids and alternate keys don't reach logs.
 */
export function redactedUrl(request: RequestInformation): string {
  let url: URL;
  try {
    url = new URL(buildUrl(request));
  } catch {
    return "(invalid URL)";
  }
  const path = url.pathname.replace(/\([^/]*\)/g, "(…)");
  return `${url.origin}${path}${url.search ? "?…" : ""}`;
}
