import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";

export class AuthMiddleware implements Middleware {
  name = "AuthMiddleware";

  constructor(private options: DataverseClientOptions) {}

  async execute(
    request: RequestInformation,
    _ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const tp = this.options.tokenProvider;
    if (!tp) return next(request, _ctx);

    // Only pass scopes if explicitly configured, otherwise let token provider use defaults
    const scopes =
      this.options.scopes &&
      (Array.isArray(this.options.scopes) ? this.options.scopes.length > 0 : true)
        ? this.options.scopes
        : undefined;
    const token = await tp.getToken(scopes);
    request.headers = { ...request.headers, authorization: `Bearer ${token}` };
    return next(request, _ctx);
  }
}
