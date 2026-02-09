import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { ConsoleLogger } from "../utils/consoleLogger.js";

export class LoggingMiddleware implements Middleware {
  name = "LoggingMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const logger = this.options.logger ?? ctx.logger ?? ConsoleLogger;
    const start = Date.now();
    logger.debug(`➡️ ${request.method} ${request.url}`, { attempt: String(ctx.attempt) });
    const res = await next(request, ctx);
    const ms = Date.now() - start;
    logger.debug(`⬅️ ${String(res.status)} ${request.method} ${request.url} (${String(ms)}ms)`, {
      attempt: String(ctx.attempt),
    });
    return res;
  }
}
