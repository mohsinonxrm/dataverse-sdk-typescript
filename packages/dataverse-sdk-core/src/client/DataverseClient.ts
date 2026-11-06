import type { Executable } from "../abstractions/executable.js";
import type {
  FetchProvider,
  MiddlewareContext,
  RequestAdapter,
  RequestInformation,
} from "../abstractions/http.js";
import type { DataverseClientOptions, RequestOptions } from "../abstractions/options.js";
import { normalizeBaseUrl, resolveRequestUrl } from "../utils/url.js";
import { Pipeline } from "../pipeline/Pipeline.js";
import { FetchRequestAdapter } from "../pipeline/FetchRequestAdapter.js";
import { buildMiddleware } from "../pipeline/DefaultMiddleware.js";
import { DataverseRequestBuilder } from "./DataverseRequestBuilder.js";
import { parseODataError } from "../errors/parseODataError.js";
import { setResponseCorrelationId } from "../errors/responseDetails.js";
import { DataverseError } from "../errors/DataverseError.js";
import { DataverseAbortError, DataverseNetworkError } from "../errors/NamedErrors.js";
import { startDeadline } from "../utils/signals.js";
import { generateUUID, normalizeHeaders } from "../utils/HeaderUtils.js";
import { FeatureUsageTracker } from "../telemetry/FeatureUsageTracker.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import type { FetchXmlOptions, FetchXmlPage } from "../fetchxml/page.js";

export class DataverseClient {
  private readonly baseUrl: string;
  private readonly pipeline: Pipeline;
  private readonly adapter: RequestAdapter;
  /** Shared by every request; each request gets its own copy (see send()). */
  private readonly baseCtx: MiddlewareContext;

  constructor(private options: DataverseClientOptions) {
    if (!isAllowedBaseUrl(options.baseUrl)) {
      throw DataverseInvalidRequestError.invalidBaseUrl(
        `"${options.baseUrl}" (must use HTTPS; plain http is only allowed for localhost)`
      );
    }
    const apiVersion = options.apiVersion ?? "v9.2";
    this.baseUrl = normalizeBaseUrl(options.baseUrl, apiVersion);

    const fetchProvider: FetchProvider = options.fetchProvider ?? {
      fetch: globalThis.fetch.bind(globalThis),
    };
    this.adapter = new FetchRequestAdapter(fetchProvider);

    const middleware = buildMiddleware(options);
    this.pipeline = new Pipeline(middleware);

    this.baseCtx = {
      logger: options.logger,
      telemetry: options.telemetry,
      // Per client, so feature flags from one client never leak into another's telemetry.
      featureTracker: new FeatureUsageTracker(),
    };

    // eslint-disable-next-line @typescript-eslint/no-deprecated -- warning about the deprecated option itself
    if (options.circuitBreaker?.enabled) {
      options.logger?.warn(
        "circuitBreaker option is configured but not yet implemented — it has no effect."
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- warning about the deprecated option itself
    if (options.bulkhead?.enabled) {
      options.logger?.warn(
        "bulkhead option is configured but not yet implemented — it has no effect."
      );
    }
  }

  /**
   * Resolve a path against this client's Web API root. Absolute `http(s)://` URLs are returned
   * unchanged. `send()` does this for every request, so relative URLs such as `"WhoAmI"` or
   * `"/accounts(…)"` work there too.
   */
  resolveUrl(pathOrUrl: string): string {
    return resolveRequestUrl(this.baseUrl, pathOrUrl);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  api(pathOrAbsoluteUrl: string): DataverseRequestBuilder {
    return new DataverseRequestBuilder(this, pathOrAbsoluteUrl);
  }

  /**
   * Run a FetchXML query and return one page: `client.api(entitySetName).fetchXml(fetchXml)`.
   * See `DataverseRequestBuilder.fetchXml()`.
   */
  fetchXml<T = Record<string, unknown>>(
    entitySetName: string,
    fetchXml: string,
    options?: FetchXmlOptions
  ): Promise<FetchXmlPage<T>> {
    return this.api(entitySetName).fetchXml<T>(fetchXml, options);
  }

  /** Run a system view by id, as one page: `GET {entitySetName}?savedQuery={id}`. */
  savedQuery<T = Record<string, unknown>>(
    entitySetName: string,
    savedQueryId: string,
    options?: FetchXmlOptions
  ): Promise<FetchXmlPage<T>> {
    return this.api(entitySetName).savedQuery<T>(savedQueryId, options);
  }

  /** Run a personal view by id, as one page: `GET {entitySetName}?userQuery={id}`. */
  userQuery<T = Record<string, unknown>>(
    entitySetName: string,
    userQueryId: string,
    options?: FetchXmlOptions
  ): Promise<FetchXmlPage<T>> {
    return this.api(entitySetName).userQuery<T>(userQueryId, options);
  }

  /**
   * Create binding payload for single-valued navigation properties
   * @param navigationProperty - The navigation property name
   * @param entitySetName - The target entity set (e.g., 'accounts')
   * @param id - The target record ID
   * @returns Object to spread into POST/PATCH body
   */
  bind(navigationProperty: string, entitySetName: string, id: string): Record<string, string> {
    return {
      [`${navigationProperty}@odata.bind`]: `/${entitySetName}(${id})`,
    };
  }

  async execute<T>(request: Executable<T>, options?: RequestOptions): Promise<T> {
    const info = request.toRequestInformation(this.baseUrl);
    applyOptions(info, options);
    const res = await this.send(info);
    if (!res.ok) {
      const err = await parseODataError(res);
      throw err;
    }
    return request.parseResponse(res);
  }

  async send(request: RequestInformation): Promise<Response> {
    // timeoutMs covers the whole request, retries and waits included (#46): it becomes a deadline
    // signal that every attempt, retry wait and concurrency-slot wait sees.
    const deadline = request.timeoutMs
      ? startDeadline(request.timeoutMs, request.signal)
      : undefined;
    // Work on a copy with lower-cased header names: middleware must never see (or send) two
    // casings of the same header, and the caller's object must not be mutated.
    const req: RequestInformation = {
      ...request,
      url: this.resolveUrl(request.url),
      headers: normalizeHeaders(request.headers),
      signal: deadline?.signal ?? request.signal,
      // The adapter limits single attempts only with attemptTimeoutMs; the deadline does the rest.
      timeoutMs: undefined,
    };
    // A fresh context per request: middleware writes to it (correlation id, retry attempt), so a
    // shared one would give every request the same correlation id and let concurrent requests
    // overwrite each other's attempt numbers.
    const ctx: MiddlewareContext = {
      ...this.baseCtx,
      correlationId: request.correlationId ?? generateUUID(),
      attempt: 0,
      middlewareOptions: request.middlewareOptions,
    };
    try {
      const res = await this.pipeline.execute(req, ctx, (r, c) => this.adapter.send(r, c));
      setResponseCorrelationId(res, ctx.correlationId);
      return res;
    } catch (err) {
      if (deadline?.expired && !request.signal?.aborted) {
        throw asSdkError(DataverseNetworkError.timeout(request.timeoutMs ?? 0), ctx.correlationId);
      }
      throw asSdkError(err, ctx.correlationId);
    } finally {
      deadline?.dispose();
    }
  }
}

function applyOptions(req: RequestInformation, opt?: RequestOptions) {
  if (!opt) return;
  req.headers = normalizeHeaders({
    ...normalizeHeaders(req.headers),
    ...normalizeHeaders(opt.headers),
  });
  if (opt.timeoutMs !== undefined) req.timeoutMs = opt.timeoutMs;
  if (opt.attemptTimeoutMs !== undefined) req.attemptTimeoutMs = opt.attemptTimeoutMs;
  if (opt.correlationId) req.correlationId = opt.correlationId;
  if (opt.middlewareOptions) req.middlewareOptions = opt.middlewareOptions;
  if (opt.signal) req.signal = opt.signal;
  if (opt.prefer?.length) {
    // Prefer is a single header with comma-separated values; names are lower-cased above.
    const existing = req.headers.prefer;
    const merged = existing ? `${existing}, ${opt.prefer.join(", ")}` : opt.prefer.join(", ");
    req.headers = { ...req.headers, prefer: merged };
  }
}

/**
 * Dataverse only serves HTTPS. Plain http is allowed for loopback hosts so local proxies
 * and test servers keep working.
 */
function isAllowedBaseUrl(baseUrl: string): boolean {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return false;
  }
  if (url.protocol === "https:") return true;
  return (
    url.protocol === "http:" &&
    (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]")
  );
}

/**
 * Errors leaving `send()`: an abort (a `DOMException` from fetch or from a retry wait) becomes a
 * `DataverseAbortError`, and every SDK error gets the request's correlation id. Errors thrown by
 * the app's own middleware or token provider are passed through unchanged.
 */
function asSdkError(err: unknown, correlationId: string | undefined): unknown {
  const sdkError =
    err instanceof DataverseError
      ? err
      : err instanceof Error && err.name === "AbortError"
        ? new DataverseAbortError(err.message || undefined, err)
        : undefined;
  if (!sdkError) return err;
  sdkError.correlationId ??= correlationId;
  return sdkError;
}
