import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { MiddlewareOptions } from "./RequestOptions.js";
import { DataverseInvalidRequestError, DataverseNetworkError } from "../errors/NamedErrors.js";
import { abortError } from "../utils/signals.js";
import { buildUrl } from "../utils/url.js";

/** A fault `ChaosMiddleware` injects in place of a request. */
export interface ChaosFault {
  /**
   * Status of the fake response (200–599), or `"network"` to fail the attempt the way a dropped
   * connection does: with a `DataverseNetworkError` named `ConnectionFailed`.
   */
  status: number | "network";
  /** `Retry-After` of the fake response, in seconds. @default 1 for a 429, none otherwise */
  retryAfterSeconds?: number;
  /** More headers for the fake response. */
  headers?: Record<string, string>;
  /**
   * Body of the fake response: a string is sent as is, anything else as JSON.
   * @default a Dataverse error body, `{ error: { code, message } }` (for a 429, the "number of
   * requests" service-protection error, code `0x80072322`)
   */
  body?: unknown;
}

/** What `ChaosOptions.script` receives besides the request. */
export interface ChaosScriptInfo {
  /** How many requests this middleware saw before this one (each retry attempt counts): 0 first. */
  requestIndex: number;
  /** The retry attempt of the request: 0 for the first attempt. */
  attempt: number;
}

/**
 * Settings of `ChaosMiddleware`. With none, 10% of requests get a fault picked at random from
 * 429 (`Retry-After: 1`), 502, 503 and 504.
 */
export interface ChaosOptions {
  /**
   * Percentage of requests (0–100) that get a fault. Not used with `script`.
   * @default 10
   */
  percentage?: number;
  /**
   * The faults to pick from, at random, for a request that gets one. Not used with `script`.
   * @default 429 with `Retry-After: 1`, 502, 503, 504
   */
  faults?: readonly ChaosFault[];
  /**
   * Only requests that match can get a fault: a `RegExp` tested against the full request URL
   * (query included), or a function of the request. @default every request
   */
  match?: RegExp | ((request: RequestInformation) => boolean);
  /**
   * Decide yourself: return the fault for this request, or `undefined` to send it. Replaces
   * `percentage` and `faults`; `match` still applies first.
   */
  script?: (request: RequestInformation, info: ChaosScriptInfo) => ChaosFault | undefined;
  /** Random numbers in [0, 1), e.g. a seeded generator for repeatable runs. @default Math.random */
  random?: () => number;
  /** Called with each fault injected, e.g. to count them. It must not throw; an error it throws is ignored. */
  onFault?: (fault: ChaosFault, request: RequestInformation) => void;
}

/**
 * Per-request settings of `ChaosMiddleware`:
 * `new MiddlewareRequestOptions([{ type: "chaos", disable: true }])`.
 */
export interface ChaosRequestOptions extends MiddlewareOptions {
  /** Never inject a fault into this request. */
  disable?: boolean;
  /** Always inject this fault into this request (every attempt), whatever the other settings. */
  fault?: ChaosFault;
}

const DEFAULT_FAULTS: readonly ChaosFault[] = [
  { status: 429 },
  { status: 502 },
  { status: 503 },
  { status: 504 },
];

const NULL_BODY_STATUS = new Set([101, 103, 204, 205, 304]);

/**
 * Fault injection for testing how an app copes with throttling and outages, modelled on the
 * Microsoft Graph SDK's `ChaosHandler`. It answers some requests itself, with a fake 429 (with
 * `Retry-After`), 502, 503 or 504, or fails them like a dropped connection, without sending them.
 *
 * It is never part of the default pipeline: add it yourself, with `middleware.append` so it runs
 * last, inside the retry and concurrency middleware, and its faults go through the same retry
 * handling as real ones. Don't add it in production.
 *
 * @example
 * ```typescript
 * const client = new DataverseClient({
 *   baseUrl,
 *   tokenProvider,
 *   middleware: {
 *     append: [
 *       new ChaosMiddleware({
 *         percentage: 20,
 *         faults: [{ status: 429, retryAfterSeconds: 2 }, { status: 503 }, { status: "network" }],
 *         match: /\/accounts/,
 *       }),
 *     ],
 *   },
 * });
 *
 * // Or a script: the first two attempts of each request fail with 503.
 * new ChaosMiddleware({ script: (_request, { attempt }) => (attempt < 2 ? { status: 503 } : undefined) });
 * ```
 */
export class ChaosMiddleware implements Middleware {
  name = "ChaosMiddleware";
  private readonly percentage: number;
  private readonly faults: readonly ChaosFault[];
  private readonly random: () => number;
  private seen = 0;

  constructor(private readonly options: ChaosOptions = {}) {
    const percentage = options.percentage ?? 10;
    if (!(Number.isFinite(percentage) && percentage >= 0 && percentage <= 100)) {
      throw DataverseInvalidRequestError.invalidParameter(
        "chaos.percentage",
        `must be a number from 0 to 100 (got ${String(percentage)})`
      );
    }
    const faults = options.faults ?? DEFAULT_FAULTS;
    if (faults.length === 0) {
      throw DataverseInvalidRequestError.invalidParameter("chaos.faults", "must not be empty");
    }
    faults.forEach(validateFault);
    this.percentage = percentage;
    this.faults = faults;
    this.random = options.random ?? Math.random;
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const requestIndex = this.seen++;
    const perRequest: ChaosRequestOptions | undefined = ctx.middlewareOptions?.get("chaos");
    if (perRequest?.disable) return next(request, ctx);
    const fault =
      perRequest?.fault ?? this.pick(request, { requestIndex, attempt: ctx.attempt ?? 0 });
    if (!fault) return next(request, ctx);

    validateFault(fault);
    if (request.signal?.aborted) throw abortError(request.signal);
    try {
      this.options.onFault?.(fault, request);
    } catch {
      // A counting hook must not change what the request sees.
    }
    ctx.logger?.debug("ChaosMiddleware injected a fault", {
      status: fault.status,
      method: request.method,
    });
    if (fault.status === "network") {
      throw DataverseNetworkError.connectionFailed(
        "injected by ChaosMiddleware",
        new TypeError("fetch failed")
      );
    }
    return fakeResponse(fault, fault.status);
  }

  private pick(request: RequestInformation, info: ChaosScriptInfo): ChaosFault | undefined {
    const { match, script } = this.options;
    if (match) {
      if (match instanceof RegExp) match.lastIndex = 0; // a /g or /y RegExp keeps state between tests
      const matches = match instanceof RegExp ? match.test(buildUrl(request)) : match(request);
      if (!matches) return undefined;
    }
    if (script) return script(request, info);
    if (this.random() * 100 >= this.percentage) return undefined;
    const index = Math.min(this.faults.length - 1, Math.floor(this.random() * this.faults.length));
    return this.faults[index];
  }
}

function validateFault(fault: ChaosFault): void {
  const { status, retryAfterSeconds } = fault;
  if (status !== "network" && !(Number.isInteger(status) && status >= 200 && status <= 599)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "chaos fault status",
      `must be a whole number from 200 to 599, or "network" (got ${String(status)})`
    );
  }
  if (
    retryAfterSeconds !== undefined &&
    !(Number.isFinite(retryAfterSeconds) && retryAfterSeconds >= 0)
  ) {
    throw DataverseInvalidRequestError.invalidParameter(
      "chaos fault retryAfterSeconds",
      `must be a number of at least 0 (got ${String(retryAfterSeconds)})`
    );
  }
}

function fakeResponse(fault: ChaosFault, status: number): Response {
  const headers: Record<string, string> = {};
  const retryAfter = fault.retryAfterSeconds ?? (status === 429 ? 1 : undefined);
  if (retryAfter !== undefined) headers["retry-after"] = String(retryAfter);
  if (NULL_BODY_STATUS.has(status)) {
    return new Response(null, { status, headers: { ...headers, ...fault.headers } });
  }
  const body = fault.body === undefined ? defaultBody(status) : fault.body;
  const text = typeof body === "string" ? body : JSON.stringify(body);
  if (typeof body !== "string")
    headers["content-type"] = "application/json; odata.metadata=minimal";
  return new Response(text, { status, headers: { ...headers, ...fault.headers } });
}

function defaultBody(status: number): unknown {
  if (status === 429) {
    return {
      error: {
        code: "0x80072322",
        message:
          "Number of requests exceeded the limit of 6000 over time window of 300 seconds. (Injected by ChaosMiddleware.)",
      },
    };
  }
  if (status < 400) return {};
  return {
    error: {
      code: "ChaosFault",
      message: `HTTP ${String(status)} injected by ChaosMiddleware.`,
    },
  };
}
