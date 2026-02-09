import type { Middleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";

export class Pipeline {
  constructor(private middleware: Middleware[]) {}

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    terminal: (r: RequestInformation, c: MiddlewareContext) => Promise<Response>
  ): Promise<Response> {
    const chain = this.middleware.reduceRight(
      (next, mw) => (req, c) => mw.execute(req, c, next),
      terminal
    );
    return chain(request, ctx);
  }
}
