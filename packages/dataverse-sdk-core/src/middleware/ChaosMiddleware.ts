import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import type { MiddlewareOptions } from "./RequestOptions.js";
import { DataverseInvalidRequestError, DataverseNetworkError } from "../errors/NamedErrors.js";
import { TelemetryEvents } from "../telemetry/events.js";
import { systemClock, type Clock } from "../utils/clock.js";
import { abortError } from "../utils/signals.js";
import { requestTelemetry } from "../utils/telemetry.js";
import { buildUrl } from "../utils/url.js";

/**
 * A fault `ChaosMiddleware` injects into a request. `status` says which kind:
 *
 * - a number (200–599): a fake response with that status, in place of the request;
 * - `"network"`: the attempt fails the way a dropped connection does, with a
 *   `DataverseNetworkError` named `ConnectionFailed`;
 * - `"latency"`: the request is sent after a delay of `delayMs` (a slow network or org);
 * - `"hang"`: no answer, ever: the attempt waits until the request's `signal` aborts (`timeoutMs`,
 *   or the caller) or its `attemptTimeoutMs` passes, to test those limits.
 */
export interface ChaosFault {
  /**
   * Status of the fake response (200–599), `"network"` (a dropped connection), `"latency"` (send
   * the request after `delayMs`) or `"hang"` (never answer). See {@link ChaosFault}.
   */
  status: number | "network" | "latency" | "hang";
  /**
   * Wait this long, in ms, before the fault: required for `"latency"` (the request is sent after
   * it), optional for a status or `"network"` (a slow failure), not used by `"hang"`. The wait
   * ends early when the request's `signal` aborts. A wait as long as the request's
   * `attemptTimeoutMs` or longer fails the attempt with a `DataverseNetworkError` named
   * `RequestTimeout` when `attemptTimeoutMs` passes, as a slow response would.
   */
  delayMs?: number;
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
 *
 * Chaos is for dev and test environments only, never a live production environment: always set
 * `enabled`, for example `enabled: process.env.DATAVERSE_SDK_CHAOS === "1"`.
 */
export interface ChaosOptions {
  /**
   * Whether the middleware injects faults: `true`, `false`, or a function of the request, asked
   * for each attempt (for example `() => featureFlags.chaos`). While it is `false`, or the
   * function returns anything but `true` or throws, requests go through untouched, per-request
   * `fault`s included.
   *
   * Set it explicitly. Without it chaos is on, as in 2.0, and the middleware logs a warning
   * (`logger.warn`, once) the first time it runs; in 3.0 it is planned to default to off.
   */
  enabled?: boolean | ((request: RequestInformation) => boolean);
  /**
   * Percentage of requests (0–100) that get a fault. Not used with `script`. Keep it low (Polly's
   * chaos strategies default to 0.1%) unless a test wants every request to get one.
   * @default 10
   */
  percentage?: number;
  /**
   * The faults to pick from, at random, for a request that gets one. Not used with `script`.
   * `ChaosPresets` has sets of Dataverse failures.
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
  /**
   * The clock that times `delayMs`, and the `attemptTimeoutMs` of a delayed or hanging attempt,
   * e.g. a fake clock in tests. @default the client's `clock` (`DataverseClientOptions.clock`),
   *   else `systemClock` (the real one)
   */
  clock?: Clock;
}

/**
 * Per-request settings of `ChaosMiddleware`:
 * `new MiddlewareRequestOptions([{ type: "chaos", disable: true }])`.
 */
export interface ChaosRequestOptions extends MiddlewareOptions {
  /** Never inject a fault into this request. */
  disable?: boolean;
  /**
   * Always inject this fault into this request (every attempt), whatever the other settings,
   * while the middleware is `enabled`.
   */
  fault?: ChaosFault;
}

const DEFAULT_FAULTS: readonly ChaosFault[] = [
  { status: 429 },
  { status: 502 },
  { status: 503 },
  { status: 504 },
];

const NULL_BODY_STATUS = new Set([101, 103, 204, 205, 304]);

/** The warning logged once when `enabled` isn't set. */
export const CHAOS_ENABLED_WARNING =
  'ChaosMiddleware is on without `enabled`: set `enabled` explicitly (for example `enabled: process.env.DATAVERSE_SDK_CHAOS === "1"`); in 3.0 it will default to off. Chaos is for dev and test environments only, never production.';

/**
 * Fault injection for testing how an app copes with throttling, outages and slow responses,
 * modelled on the Microsoft Graph SDK's `ChaosHandler` and Polly's chaos strategies. It answers
 * some requests itself, with a fake 429 (with `Retry-After`), 502, 503 or 504, fails them like a
 * dropped connection without sending them, delays them (`"latency"`) or never answers them
 * (`"hang"`).
 *
 * Chaos is for dev and test environments only, never a live production environment: switch it
 * with `enabled`, for example from an environment variable, so the same setup is off in
 * production. It is never part of the default pipeline: add it yourself, with `middleware.append`
 * so it runs last, inside the retry and concurrency middleware, and its faults go through the
 * same retry handling as real ones.
 *
 * Each fault it injects is tracked as a `dataverse.chaos.injected` event
 * (`TelemetryEvents.chaosInjected`) when the client has a telemetry client, and the attempt's
 * dependency carries `chaos.injected: "true"`, so dashboards can tell injected faults from real
 * ones.
 *
 * @example
 * ```typescript
 * const client = new DataverseClient({
 *   baseUrl,
 *   tokenProvider,
 *   middleware: {
 *     append: [
 *       new ChaosMiddleware({
 *         enabled: process.env.DATAVERSE_SDK_CHAOS === "1",
 *         percentage: 5,
 *         faults: [{ status: 429, retryAfterSeconds: 2 }, { status: 503 }, { status: "network" }],
 *         match: /\/accounts/,
 *       }),
 *     ],
 *   },
 * });
 *
 * // Or a script: the first two attempts of each request fail with 503.
 * new ChaosMiddleware({
 *   enabled: true,
 *   script: (_request, { attempt }) => (attempt < 2 ? { status: 503 } : undefined),
 * });
 * ```
 */
export class ChaosMiddleware implements Middleware {
  name = "ChaosMiddleware";
  private readonly percentage: number;
  private readonly faults: readonly ChaosFault[];
  private readonly random: () => number;
  /** The last request's `ctx.clock`, used when the `clock` option isn't set. */
  private ctxClock?: Clock;
  private seen = 0;
  private warned = false;

  constructor(private readonly options: ChaosOptions = {}) {
    const { enabled } = options;
    if (enabled !== undefined && typeof enabled !== "boolean" && typeof enabled !== "function") {
      throw DataverseInvalidRequestError.invalidParameter(
        "chaos.enabled",
        `must be a boolean or a function (got ${typeof enabled})`
      );
    }
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

  /** Its own `clock`, else the client's (`ctx.clock` of the last request), else the real one. */
  private get clock(): Clock {
    return this.options.clock ?? this.ctxClock ?? systemClock;
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const requestIndex = this.seen++;
    this.ctxClock = ctx.clock;
    if (!this.isEnabled(request, ctx)) return next(request, ctx);
    const perRequest = ctx.middlewareOptions?.get("chaos");
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
    const kind = faultKind(fault);
    // Read by the telemetry middleware (outside this one) when the attempt ends (#475).
    ctx.chaos =
      typeof fault.status === "number" ? { fault: kind, status: fault.status } : { fault: kind };
    ctx.logger?.debug("ChaosMiddleware injected a fault", {
      status: fault.status,
      method: request.method,
    });
    track(request, ctx, fault, kind);

    if (fault.status === "hang") return this.hang(request, ctx);
    if (fault.delayMs) await this.delay(fault.delayMs, request);
    if (fault.status === "latency") return next(request, ctx);
    if (fault.status === "network") {
      throw DataverseNetworkError.connectionFailed(
        "injected by ChaosMiddleware",
        new TypeError("fetch failed")
      );
    }
    return fakeResponse(fault, fault.status);
  }

  private isEnabled(request: RequestInformation, ctx: MiddlewareContext): boolean {
    const { enabled } = this.options;
    if (enabled === undefined) {
      if (!this.warned) {
        this.warned = true;
        ctx.logger?.warn(CHAOS_ENABLED_WARNING);
      }
      return true;
    }
    if (typeof enabled === "boolean") return enabled;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare -- a JavaScript caller may return anything; only `true` turns chaos on
      return enabled(request) === true;
    } catch (e) {
      // Fail safe: chaos that can't tell whether it should run doesn't.
      ctx.logger?.warn("ChaosMiddleware `enabled` threw; no fault for this request", {
        error: e instanceof Error ? e.name : typeof e,
      });
      return false;
    }
  }

  /** A slow answer: wait `ms`, or fail the attempt as timed out once its `attemptTimeoutMs` passes. */
  private async delay(ms: number, request: RequestInformation): Promise<void> {
    const attemptMs = attemptTimeout(request);
    if (attemptMs && ms >= attemptMs) {
      await this.clock.sleep(attemptMs, request.signal);
      throw DataverseNetworkError.timeout(attemptMs);
    }
    await this.clock.sleep(ms, request.signal);
  }

  /** No answer: rejects when the signal aborts or `attemptTimeoutMs` passes; never resolves. */
  private async hang(request: RequestInformation, ctx: MiddlewareContext): Promise<never> {
    const attemptMs = attemptTimeout(request);
    if (attemptMs) {
      await this.clock.sleep(attemptMs, request.signal);
      throw DataverseNetworkError.timeout(attemptMs);
    }
    const signal = request.signal;
    if (!signal) {
      ctx.logger?.warn(
        "ChaosMiddleware hang fault on a request with no signal, timeoutMs or attemptTimeoutMs: it never ends"
      );
    }
    return new Promise<never>((_resolve, reject) => {
      signal?.addEventListener(
        "abort",
        () => {
          reject(abortError(signal));
        },
        { once: true }
      );
    });
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

type ChaosFaultKind = "status" | "network" | "latency" | "hang";

function faultKind(fault: ChaosFault): ChaosFaultKind {
  return typeof fault.status === "number" ? "status" : fault.status;
}

/** The attempt's time limit, as the fetch adapter applies it. */
function attemptTimeout(request: RequestInformation): number | undefined {
  return request.attemptTimeoutMs ?? request.timeoutMs;
}

/** The `dataverse.chaos.injected` event, when the client has a telemetry client. */
function track(
  request: RequestInformation,
  ctx: MiddlewareContext,
  fault: ChaosFault,
  kind: ChaosFaultKind
): void {
  const telemetry = requestTelemetry({}, ctx);
  if (!telemetry) return;
  const props: Record<string, string> = {
    "chaos.fault": kind,
    "request.method": request.method,
  };
  if (ctx.correlationId) props["correlation.id"] = ctx.correlationId;
  if (kind === "network") props["error.type"] = "ConnectionFailed";
  const measurements: Record<string, number> = { "retry.attempt": ctx.attempt ?? 0 };
  if (typeof fault.status === "number") measurements.status = fault.status;
  if (fault.delayMs && kind !== "hang") measurements["chaos.delay_ms"] = fault.delayMs;
  telemetry.trackEvent(TelemetryEvents.chaosInjected, props, measurements);
}

function validateFault(fault: ChaosFault): void {
  const { status, retryAfterSeconds, delayMs } = fault;
  if (
    status !== "network" &&
    status !== "latency" &&
    status !== "hang" &&
    !(Number.isInteger(status) && status >= 200 && status <= 599)
  ) {
    throw DataverseInvalidRequestError.invalidParameter(
      "chaos fault status",
      `must be a whole number from 200 to 599, "network", "latency" or "hang" (got ${String(status)})`
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
  if (delayMs !== undefined && !(Number.isFinite(delayMs) && delayMs >= 0)) {
    throw DataverseInvalidRequestError.invalidParameter(
      "chaos fault delayMs",
      `must be a number of at least 0 (got ${String(delayMs)})`
    );
  }
  if (status === "latency" && delayMs === undefined) {
    throw DataverseInvalidRequestError.invalidParameter(
      "chaos fault delayMs",
      'is required for a "latency" fault'
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
