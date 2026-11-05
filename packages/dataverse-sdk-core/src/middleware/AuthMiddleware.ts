import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { DataverseClientOptions } from "../abstractions/options.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";

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
    const token = await tp.getToken(scopes);
    request.headers = { ...request.headers, authorization: `Bearer ${token}` };
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
