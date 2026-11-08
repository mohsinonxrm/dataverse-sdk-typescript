import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import { isStreamBody } from "../utils/body.js";
import { parseClaimsChallenge } from "../utils/claimsChallenge.js";
import { tokenOriginRefusal, tokenOrigins } from "../utils/tokenOrigins.js";

export class AuthMiddleware implements Middleware {
  name = "AuthMiddleware";

  private readonly allowedOrigins: Set<string>;

  constructor(private options: DataverseClientOptions) {
    this.allowedOrigins = tokenOrigins(options);
  }

  async execute(
    request: RequestInformation,
    _ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const tp = this.options.tokenProvider;
    if (!tp) return next(request, _ctx);

    // Never attach the token to another origin: a pasted URL, a crafted @odata.nextLink or a
    // consumer bug would otherwise send the user's Dataverse token to an arbitrary host.
    const refusal = this.refusalFor(request.url);
    if (refusal) {
      if (this.options.onForeignOrigin === "strip") {
        const { authorization: _dropped, ...rest } = request.headers;
        request.headers = rest;
        return next(request, _ctx);
      }
      throw DataverseInvalidRequestError.tokenOriginRefused(refusal);
    }

    // Only pass scopes if explicitly configured, otherwise let token provider use defaults
    const scopes =
      this.options.scopes &&
      (Array.isArray(this.options.scopes) ? this.options.scopes.length > 0 : true)
        ? this.options.scopes
        : undefined;
    const correlationId = _ctx.correlationId;
    const token = await tp.getToken(scopes, correlationId ? { correlationId } : undefined);
    request.headers = { ...request.headers, authorization: `Bearer ${token}` };
    const res = await next(request, _ctx);

    // One recovery attempt after a 401: a claims challenge (Conditional Access / CAE) goes to the
    // token provider; anything else (expired or revoked token) asks for a fresh token (#21).
    if (
      res.status !== 401 ||
      this.options.refreshTokenOn401 === false ||
      isStreamBody(request.body)
    ) {
      return res;
    }
    const claims = parseClaimsChallenge(res.headers.get("www-authenticate"));
    _ctx.logger?.debug("401 Unauthorized: getting a new token and retrying once", {
      claimsChallenge: claims !== undefined,
    });
    // Drop the 401 body first, so it is released even when getting the new token throws (#378).
    // Not awaited: a tee'd stream only settles once every branch is done.
    res.body?.cancel().catch(() => undefined);
    const retryToken = await tp.getToken(scopes, {
      ...(correlationId ? { correlationId } : {}),
      ...(claims !== undefined ? { claims } : { forceRefresh: true }),
    });
    request.headers = { ...request.headers, authorization: `Bearer ${retryToken}` };
    return next(request, _ctx);
  }

  /** Why the token may not go to `url`, or undefined when it may. */
  private refusalFor(url: string): string | undefined {
    return tokenOriginRefusal(url, this.options.baseUrl, this.allowedOrigins);
  }
}
