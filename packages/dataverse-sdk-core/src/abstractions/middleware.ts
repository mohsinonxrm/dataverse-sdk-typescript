import type { MiddlewareContext, RequestInformation } from "./http.js";

export type NextMiddleware = (
  request: RequestInformation,
  ctx: MiddlewareContext
) => Promise<Response>;

export interface Middleware {
  name: string;
  execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response>;
}
