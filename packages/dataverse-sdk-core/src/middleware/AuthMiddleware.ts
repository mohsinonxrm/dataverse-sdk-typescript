import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import { isStreamBody } from "../utils/body.js";
import { parseClaimsChallenge } from "../utils/claimsChallenge.js";

export class AuthMiddleware implements Middleware {
  name = "AuthMiddleware";

  private readonly allowedOrigins: Set<string>;

  constructor(private options: DataverseClientOptions) {
    this.allowedOrigins = new Set(
      [options.baseUrl, ...(options.allowedTokenOrigins ?? [])]
        .map((u) => originOf(u))
        .filter((o): o is string => o !== undefined)
    );
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
    const retryToken = await tp.getToken(scopes, {
      ...(correlationId ? { correlationId } : {}),
      ...(claims !== undefined ? { claims } : { forceRefresh: true }),
    });
    // Drop the 401 body without waiting: a tee'd stream only settles once every branch is done.
    res.body?.cancel().catch(() => undefined);
    request.headers = { ...request.headers, authorization: `Bearer ${retryToken}` };
    return next(request, _ctx);
  }

  /** Why the token may not go to `url`, or undefined when it may. */
  private refusalFor(url: string): string | undefined {
    let parsed: URL;
    try {
      parsed = new URL(url, this.options.baseUrl);
    } catch {
      return "the request URL can't be parsed, so the access token is not sent";
    }
    if (parsed.username || parsed.password) {
      return "the request URL contains credentials (user info), so the access token is not sent";
    }
    if (!this.allowedOrigins.has(parsed.origin)) {
      return `refusing to send the access token to ${parsed.origin}; only ${[...this.allowedOrigins].join(", ")} may receive it (see DataverseClientOptions.allowedTokenOrigins)`;
    }
    return undefined;
  }
}

/** The origin of a URL (lower-cased host, punycode), or undefined when it isn't absolute. */
function originOf(url: string): string | undefined {
  try {
    const origin = new URL(url).origin;
    return origin === "null" ? undefined : origin;
  } catch {
    return undefined;
  }
}
