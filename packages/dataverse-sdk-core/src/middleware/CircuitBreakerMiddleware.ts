import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type {
  Logger,
  MiddlewareContext,
  RequestInformation,
  TelemetryClient,
} from "../abstractions/http.js";
import { DataverseCircuitOpenError } from "../errors/DataverseResilienceErrors.js";
import { DataverseInvalidRequestError, DataverseNetworkError } from "../errors/NamedErrors.js";
import { TelemetryEvents } from "../telemetry/events.js";
import { guardTelemetry, requestTelemetry, type SafeTelemetry } from "../utils/telemetry.js";

/**
 * State of a circuit breaker: `"closed"` sends requests, `"open"` refuses them, `"half-open"`
 * lets one probe request through to test whether the service is back. A circuit held open with
 * `isolate()` reads as `"open"` (see `isolated`).
 */
export type CircuitState = "closed" | "open" | "half-open";

/** What `CircuitBreakerOptions.onStateChange` receives. */
export interface CircuitStateChange {
  from: CircuitState;
  to: CircuitState;
  /** Failures in a row that led here (0 when the circuit closes). */
  consecutiveFailures: number;
}

/** What a `CircuitBreakerOptions.breakDurationMs` function receives each time the circuit opens. */
export interface CircuitBreakDurationInfo {
  /**
   * The failures that opened it: in a row (`mode: "consecutive"`), or in the sampling window
   * (`mode: "ratio"`). After a failed probe, the count including that probe.
   */
  failures: number;
  /**
   * How many times the circuit has opened since it last closed: 1 the first time, 2 when the first
   * probe fails, and so on. Use it to back off, e.g. `({ consecutiveOpens: n }) => 5000 * 2 ** n`.
   */
  consecutiveOpens: number;
}

/** Settings of `CircuitBreakerMiddleware`. */
export interface CircuitBreakerOptions {
  /**
   * What opens the circuit:
   * - `"consecutive"`: `failureThreshold` failures in a row.
   * - `"ratio"`: within the last `samplingDurationMs`, at least `minimumThroughput` requests that
   *   succeeded or failed, of which at least `failureRatio` failed (Polly's advanced circuit
   *   breaker). Neutral outcomes (a 429, another 4xx, an aborted request) don't count either way.
   *
   * @default "consecutive"
   */
  mode?: "consecutive" | "ratio";
  /** Failures in a row that open the circuit (`mode: "consecutive"`). @default 5 */
  failureThreshold?: number;
  /**
   * Share of failures, from 0 to 1, that opens the circuit (`mode: "ratio"`): `failures /
   * (failures + successes)` within `samplingDurationMs`.
   * @default 0.5
   */
  failureRatio?: number;
  /**
   * Fewest failures plus successes within `samplingDurationMs` before `failureRatio` can open the
   * circuit (`mode: "ratio"`), so a couple of failures on a quiet client don't. A whole number.
   * @default 10
   */
  minimumThroughput?: number;
  /** Length of the sliding window of outcomes, in ms (`mode: "ratio"`). @default 30000 */
  samplingDurationMs?: number;
  /**
   * How long the circuit stays open before it lets a probe request through, in ms. A function is
   * called each time the circuit opens, to back off on repeated failures; if it throws or returns
   * something other than a number of at least 0, 30000 is used (and a warning logged).
   * @default 30000
   */
  breakDurationMs?: number | ((info: CircuitBreakDurationInfo) => number);
  /**
   * Whether an attempt counts as a failure. It gets the response status, or `0` and the error when
   * no response came back. A response it doesn't count as a failure is a success when its status is
   * below 400 (it resets the count), and neutral otherwise (it leaves the count as it is).
   * @default a status of 500 or more, or a `DataverseNetworkError` (a failed connection or a
   *   timed-out attempt). A 429 or another 4xx is not a failure, and doesn't reset the count either.
   */
  isFailure?: (status: number, error?: Error) => boolean;
  /**
   * Called on each change of state, e.g. to record it in telemetry. It must not throw; an error it
   * throws is ignored.
   */
  onStateChange?: (change: CircuitStateChange) => void;
  /**
   * The clock, in ms (as `Date.now()`). Every time the breaker reads (break durations, the
   * sampling window, `retryAfterMs`) comes from it, so tests can move time without fake timers.
   * @default () => Date.now()
   */
  now?: () => number;
}

/** Why the circuit changed state, as the `circuit.reason` property of `dataverse.circuit.state`. */
type Reason =
  | "failure_threshold"
  | "failure_ratio"
  | "probe_failed"
  | "probe_succeeded"
  | "break_elapsed"
  | "isolate"
  | "reset";

type ReportedState = CircuitState | "isolated";

const DEFAULT_THRESHOLD = 5;
const DEFAULT_BREAK_MS = 30_000;
const DEFAULT_RATIO = 0.5;
const DEFAULT_MIN_THROUGHPUT = 10;
const DEFAULT_SAMPLING_MS = 30_000;

function defaultIsFailure(status: number, error?: Error): boolean {
  if (error) return error instanceof DataverseNetworkError;
  return status >= 500;
}

type Outcome = "success" | "failure" | "neutral";

/**
 * A circuit breaker: after `failureThreshold` failures in a row (5xx responses or network
 * failures), or with `mode: "ratio"` once too large a share of recent requests failed, it fails
 * requests fast with `DataverseCircuitOpenError` for `breakDurationMs`, without sending them. Then
 * it lets one probe request through: if the probe succeeds the circuit closes, if it fails the
 * circuit opens for another `breakDurationMs`.
 *
 * Each attempt is one of three outcomes:
 * - **failure** (what `isFailure` counts: by default a 5xx or a network failure): adds one to the
 *   count of failures in a row.
 * - **success** (any other response with a status below 400, i.e. 2xx or 3xx): resets the count.
 * - **neutral** (any other 4xx, a 429 included, or a request its caller aborted): leaves the count
 *   as it is. A 429 is service protection, which the retry and adaptive throttling middleware
 *   handle; a 400, 401, 403, 404, 409 or 412 says the request was wrong, not that the service is
 *   healthy. So a run of 503s with 429s or 404s between them still opens the circuit.
 *
 * In `mode: "ratio"`, failures and successes go into a sliding window of `samplingDurationMs`
 * (neutral outcomes stay out of it). When a failure arrives and the window holds at least
 * `minimumThroughput` of them, of which at least `failureRatio` are failures, the circuit opens.
 * The window starts empty again each time the circuit closes.
 *
 * A neutral probe leaves the circuit half-open, and the next request is the probe. It doesn't close
 * the circuit, because a 429 or a 4xx doesn't show the service handles requests again (closing
 * would let every waiting request through to a service that just asked to slow down), and it doesn't
 * reopen it for another `breakDurationMs`, because the service did answer. Until a probe succeeds or
 * fails, requests go through one at a time, and others fail fast while a probe is in flight. A probe
 * that is still in flight after the break duration no longer holds the circuit: the next request
 * probes too (as in Polly).
 *
 * `isolate()` holds the circuit open until `reset()` (or `close()`), e.g. while the environment is
 * in administration mode. State changes are sent to the client's `telemetry` as
 * `TelemetryEvents.circuitState` (`dataverse.circuit.state`).
 *
 * Opt-in: it isn't part of the default pipeline. Add it with `middleware.append`, so it runs
 * inside the retry middleware: each attempt counts, and once the circuit opens the remaining
 * retries fail fast instead of waiting out their backoff. Use one instance per client (one org);
 * its state is shared by every request through it. Read `state` or use `onStateChange` for
 * telemetry.
 *
 * @example
 * ```typescript
 * const breaker = new CircuitBreakerMiddleware({
 *   failureThreshold: 5,
 *   breakDurationMs: 30_000,
 *   onStateChange: ({ from, to }) => console.log(`circuit ${from} -> ${to}`),
 * });
 * const client = new DataverseClient({ baseUrl, tokenProvider, middleware: { append: [breaker] } });
 *
 * try {
 *   await client.api("accounts").get();
 * } catch (err) {
 *   if (err instanceof DataverseCircuitOpenError) console.log(`Try again in ${err.retryAfterMs} ms`);
 * }
 * ```
 *
 * @example Failure ratio, with a break that grows on repeated failures
 * ```typescript
 * const breaker = new CircuitBreakerMiddleware({
 *   mode: "ratio",
 *   failureRatio: 0.5, // half of the requests that succeeded or failed...
 *   minimumThroughput: 20, // ...out of at least 20...
 *   samplingDurationMs: 60_000, // ...in the last minute
 *   breakDurationMs: ({ consecutiveOpens }) => Math.min(300_000, 15_000 * 2 ** (consecutiveOpens - 1)),
 * });
 * ```
 */
export class CircuitBreakerMiddleware implements Middleware {
  name = "CircuitBreakerMiddleware";
  private readonly mode: "consecutive" | "ratio";
  private readonly threshold: number;
  private readonly ratio: number;
  private readonly minThroughput: number;
  private readonly samplingMs: number;
  private readonly breakDuration: number | ((info: CircuitBreakDurationInfo) => number);
  private readonly isFailure: (status: number, error?: Error) => boolean;
  private readonly now: () => number;
  private current: CircuitState = "closed";
  private reported: ReportedState = "closed";
  private isolatedByCaller = false;
  private failures = 0;
  private opens = 0;
  private breakMs = 0;
  private openUntil = 0;
  private openMessage = "";
  /** Id of the probe in flight (0 when none); a later probe replaces a stale one. */
  private probeId = 0;
  private probeCount = 0;
  private probeHeldUntil = 0;
  /** The sliding window (`mode: "ratio"`): outcome times and whether each was a failure. */
  private times: number[] = [];
  private failed: boolean[] = [];
  private head = 0;
  private windowFailures = 0;
  /** The last request's logger and telemetry, for `isolate()` and `reset()`. */
  private lastLogger?: Logger;
  private lastTelemetry?: TelemetryClient;

  constructor(private readonly options: CircuitBreakerOptions = {}) {
    const mode: string = options.mode ?? "consecutive";
    if (mode !== "consecutive" && mode !== "ratio") {
      throw invalid("mode", `must be "consecutive" or "ratio" (got ${mode})`);
    }
    this.mode = mode;
    this.threshold = options.failureThreshold ?? DEFAULT_THRESHOLD;
    if (!(Number.isInteger(this.threshold) && this.threshold >= 1)) {
      throw invalid(
        "failureThreshold",
        `must be a whole number of at least 1 (got ${String(this.threshold)})`
      );
    }
    this.ratio = options.failureRatio ?? DEFAULT_RATIO;
    if (!(Number.isFinite(this.ratio) && this.ratio >= 0 && this.ratio <= 1)) {
      throw invalid("failureRatio", `must be a number from 0 to 1 (got ${String(this.ratio)})`);
    }
    this.minThroughput = options.minimumThroughput ?? DEFAULT_MIN_THROUGHPUT;
    if (!(Number.isInteger(this.minThroughput) && this.minThroughput >= 1)) {
      throw invalid(
        "minimumThroughput",
        `must be a whole number of at least 1 (got ${String(this.minThroughput)})`
      );
    }
    this.samplingMs = options.samplingDurationMs ?? DEFAULT_SAMPLING_MS;
    if (!(Number.isFinite(this.samplingMs) && this.samplingMs > 0)) {
      throw invalid(
        "samplingDurationMs",
        `must be a number greater than 0 (got ${String(this.samplingMs)})`
      );
    }
    this.breakDuration = options.breakDurationMs ?? DEFAULT_BREAK_MS;
    if (typeof this.breakDuration !== "function" && !isDuration(this.breakDuration)) {
      throw invalid(
        "breakDurationMs",
        `must be a number of at least 0 or a function (got ${String(this.breakDuration)})`
      );
    }
    this.isFailure = options.isFailure ?? defaultIsFailure;
    this.now = options.now ?? (() => Date.now());
  }

  /**
   * The state now. An open circuit whose break duration has passed reads as `"half-open"`: the
   * next request is the probe. An isolated circuit reads as `"open"`.
   */
  get state(): CircuitState {
    if (this.isolatedByCaller) return "open";
    if (this.current === "open" && this.now() >= this.openUntil) return "half-open";
    return this.current;
  }

  /** Whether `isolate()` holds the circuit open (until `reset()` or `close()`). */
  get isolated(): boolean {
    return this.isolatedByCaller;
  }

  /** Failures in a row so far. */
  get consecutiveFailures(): number {
    return this.failures;
  }

  /**
   * Hold the circuit open until `reset()` or `close()`: every request fails fast with
   * `DataverseCircuitOpenError` (without `retryAfterMs`), whatever the break duration, and no probe
   * is sent. Use it when you know the service is unavailable, e.g. during maintenance.
   */
  isolate(): void {
    this.isolatedByCaller = true;
    this.probeId = 0;
    this.transition("open", undefined, "isolate");
  }

  /**
   * Close the circuit and forget the failures (and the sampling window), e.g. after fixing a
   * configuration problem. Also ends `isolate()`.
   */
  reset(): void {
    this.isolatedByCaller = false;
    this.probeId = 0;
    this.closeCircuit("reset");
  }

  /** The same as `reset()`. */
  close(): void {
    this.reset();
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    this.lastLogger = ctx.logger;
    this.lastTelemetry = ctx.telemetry;
    const probe = this.admit(ctx);
    let outcome: Outcome = "neutral";
    try {
      const res = await next(request, ctx);
      outcome = this.classify(res.status);
      return res;
    } catch (err) {
      // A request the caller cancelled (or that ran out of its time) says nothing about the service.
      if (!request.signal?.aborted && err instanceof Error && this.isFailure(0, err)) {
        outcome = "failure";
      }
      throw err;
    } finally {
      this.record(outcome, probe, ctx);
    }
  }

  /** A failure as `isFailure` says; otherwise a success below 400, and neutral from 400 up. */
  private classify(status: number): Outcome {
    if (this.isFailure(status)) return "failure";
    return status < 400 ? "success" : "neutral";
  }

  /**
   * Let the request through, or throw `DataverseCircuitOpenError`. Returns the probe's id when it
   * is the probe, otherwise 0.
   */
  private admit(ctx: MiddlewareContext): number {
    if (this.isolatedByCaller) {
      throw new DataverseCircuitOpenError(
        "Circuit isolated with isolate(); not sending the request until reset()"
      );
    }
    const now = this.now();
    if (this.current === "open") {
      const remaining = this.openUntil - now;
      if (remaining > 0) throw new DataverseCircuitOpenError(this.openMessage, remaining);
      this.transition("half-open", ctx, "break_elapsed");
    }
    if (this.current === "half-open") {
      if (this.probeId !== 0 && this.probeHeldUntil > now) {
        throw new DataverseCircuitOpenError(
          "Circuit half-open and a probe request is in flight; not sending the request",
          this.probeHeldUntil - now
        );
      }
      this.probeId = ++this.probeCount;
      this.probeHeldUntil = now + this.breakMs;
      return this.probeId;
    }
    return 0;
  }

  private record(outcome: Outcome, probe: number, ctx: MiddlewareContext): void {
    if (probe !== 0 && probe === this.probeId) {
      this.probeId = 0;
      if (this.current !== "half-open") return;
      if (outcome === "success") {
        this.failures = 0;
        this.closeCircuit("probe_succeeded", ctx);
      } else if (outcome === "failure") {
        this.failures++;
        if (this.mode === "ratio") this.sample(true);
        this.open("probe_failed", ctx);
      }
      // Neutral (a 429 or another 4xx, or an aborted request): stay half-open, and let the next
      // request probe. A 429 doesn't show the service handles requests again, and it did answer.
      return;
    }
    // Requests that started before the circuit opened (and probes another probe replaced) don't
    // change it once it has.
    if (this.current !== "closed" || outcome === "neutral") return;
    if (outcome === "success") {
      this.failures = 0;
      if (this.mode === "ratio") this.sample(false);
      return;
    }
    this.failures++;
    if (this.mode === "consecutive") {
      if (this.failures >= this.threshold) this.open("failure_threshold", ctx);
      return;
    }
    const { failures, throughput } = this.sample(true);
    if (throughput >= this.minThroughput && failures / throughput >= this.ratio) {
      this.open("failure_ratio", ctx);
    }
  }

  /** Add an outcome to the sliding window (dropping the expired ones) and count what's in it. */
  private sample(failure?: boolean): { failures: number; throughput: number } {
    const now = this.now();
    if (failure !== undefined) {
      this.times.push(now);
      this.failed.push(failure);
      if (failure) this.windowFailures++;
    }
    const oldest = now - this.samplingMs;
    while (this.head < this.times.length && (this.times[this.head] ?? now) <= oldest) {
      if (this.failed[this.head]) this.windowFailures--;
      this.head++;
    }
    if (this.head > 1024 && this.head * 2 > this.times.length) {
      this.times = this.times.slice(this.head);
      this.failed = this.failed.slice(this.head);
      this.head = 0;
    }
    return { failures: this.windowFailures, throughput: this.times.length - this.head };
  }

  private clearWindow(): void {
    this.times = [];
    this.failed = [];
    this.head = 0;
    this.windowFailures = 0;
  }

  private open(reason: Reason, ctx: MiddlewareContext): void {
    this.opens++;
    const window = this.mode === "ratio" ? this.sample() : undefined;
    const failures = window ? window.failures : this.failures;
    this.breakMs = this.resolveBreak({ failures, consecutiveOpens: this.opens }, ctx.logger);
    this.openUntil = this.now() + this.breakMs;
    this.openMessage = !window
      ? `Circuit open after ${String(this.failures)} failures in a row; not sending the request`
      : reason === "failure_ratio"
        ? `Circuit open after ${String(window.failures)} of ${String(window.throughput)} requests failed within ${String(this.samplingMs)} ms; not sending the request`
        : "Circuit open after a failed probe request; not sending the request";
    this.transition("open", ctx, reason, window);
  }

  private closeCircuit(reason: Reason, ctx?: MiddlewareContext): void {
    this.failures = 0;
    this.opens = 0;
    this.clearWindow();
    this.transition("closed", ctx, reason);
  }

  private resolveBreak(info: CircuitBreakDurationInfo, logger?: Logger): number {
    const configured = this.breakDuration;
    if (typeof configured === "number") return configured;
    let ms: unknown;
    try {
      ms = configured(info);
    } catch (e) {
      ms = e;
    }
    if (isDuration(ms)) return ms;
    try {
      logger?.warn("circuitBreaker.breakDurationMs did not return a number of at least 0", {
        defaultMs: DEFAULT_BREAK_MS,
      });
    } catch {
      // Logging must not change what the request sees.
    }
    return DEFAULT_BREAK_MS;
  }

  private transition(
    to: CircuitState,
    ctx: MiddlewareContext | undefined,
    reason: Reason,
    window?: { failures: number; throughput: number }
  ): void {
    const from = this.current;
    const reportedFrom = this.reported;
    const reportedTo: ReportedState = this.isolatedByCaller ? "isolated" : to;
    this.current = to;
    this.reported = reportedTo;
    const logger = ctx ? ctx.logger : this.lastLogger;
    if (from !== to) {
      const change: CircuitStateChange = { from, to, consecutiveFailures: this.failures };
      try {
        if (to === "open") {
          logger?.warn("Circuit breaker opened", {
            ...change,
            reason,
            breakDurationMs: this.breakMs,
          });
        } else {
          logger?.info(`Circuit breaker ${to}`, { ...change, reason });
        }
      } catch {
        // Logging must not change what the request sees.
      }
      try {
        this.options.onStateChange?.(change);
      } catch {
        // A telemetry hook must not change what the request sees.
      }
    }
    if (reportedFrom === reportedTo) return;
    const telemetry = this.telemetryFor(ctx);
    if (!telemetry) return;
    const measurements: Record<string, number> = {
      "circuit.failures": window ? window.failures : this.failures,
    };
    if (reportedTo === "open") measurements["circuit.break_ms"] = this.breakMs;
    if (window) measurements["circuit.throughput"] = window.throughput;
    telemetry.trackEvent(
      TelemetryEvents.circuitState,
      {
        "correlation.id": ctx?.correlationId ?? "",
        "circuit.state": reportedTo,
        "circuit.previous_state": reportedFrom,
        "circuit.reason": reason,
        "circuit.mode": this.mode,
      },
      measurements
    );
  }

  /** The request's telemetry; for `isolate()` and `reset()`, the last request's. */
  private telemetryFor(ctx: MiddlewareContext | undefined): SafeTelemetry | undefined {
    if (ctx) return requestTelemetry({}, ctx);
    return this.lastTelemetry ? guardTelemetry(this.lastTelemetry, this.lastLogger) : undefined;
  }
}

function isDuration(ms: unknown): ms is number {
  return typeof ms === "number" && Number.isFinite(ms) && ms >= 0;
}

function invalid(option: string, detail: string): DataverseInvalidRequestError {
  return DataverseInvalidRequestError.invalidParameter(`circuitBreaker.${option}`, detail);
}
