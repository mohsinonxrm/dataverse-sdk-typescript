import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import { DataverseCircuitOpenError } from "../errors/DataverseResilienceErrors.js";
import { DataverseInvalidRequestError, DataverseNetworkError } from "../errors/NamedErrors.js";

/**
 * State of a circuit breaker: `"closed"` sends requests, `"open"` refuses them, `"half-open"`
 * lets one probe request through to test whether the service is back.
 */
export type CircuitState = "closed" | "open" | "half-open";

/** What `CircuitBreakerOptions.onStateChange` receives. */
export interface CircuitStateChange {
  from: CircuitState;
  to: CircuitState;
  /** Failures in a row that led here (0 when the circuit closes). */
  consecutiveFailures: number;
}

/** Settings of `CircuitBreakerMiddleware`. */
export interface CircuitBreakerOptions {
  /** Failures in a row that open the circuit. @default 5 */
  failureThreshold?: number;
  /** How long the circuit stays open before it lets a probe request through, in ms. @default 30000 */
  breakDurationMs?: number;
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
}

const DEFAULT_THRESHOLD = 5;
const DEFAULT_BREAK_MS = 30_000;

function defaultIsFailure(status: number, error?: Error): boolean {
  if (error) return error instanceof DataverseNetworkError;
  return status >= 500;
}

type Outcome = "success" | "failure" | "neutral";

/**
 * A circuit breaker: after `failureThreshold` failures in a row (5xx responses or network
 * failures), it fails requests fast with `DataverseCircuitOpenError` for `breakDurationMs`,
 * without sending them. Then it lets one probe request through: if the probe succeeds the circuit
 * closes, if it fails the circuit opens for another `breakDurationMs`.
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
 * A neutral probe leaves the circuit half-open, and the next request is the probe. It doesn't close
 * the circuit, because a 429 or a 4xx doesn't show the service handles requests again (closing
 * would let every waiting request through to a service that just asked to slow down), and it doesn't
 * reopen it for another `breakDurationMs`, because the service did answer. Until a probe succeeds or
 * fails, requests go through one at a time, and others fail fast while a probe is in flight.
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
 *   onStateChange: ({ from, to }) => telemetry.trackEvent("circuit", { from, to }),
 * });
 * const client = new DataverseClient({ baseUrl, tokenProvider, middleware: { append: [breaker] } });
 *
 * try {
 *   await client.api("accounts").get();
 * } catch (err) {
 *   if (err instanceof DataverseCircuitOpenError) console.log(`Try again in ${err.retryAfterMs} ms`);
 * }
 * ```
 */
export class CircuitBreakerMiddleware implements Middleware {
  name = "CircuitBreakerMiddleware";
  private readonly threshold: number;
  private readonly breakMs: number;
  private readonly isFailure: (status: number, error?: Error) => boolean;
  private current: CircuitState = "closed";
  private failures = 0;
  private openedAt = 0;
  private probing = false;

  constructor(private readonly options: CircuitBreakerOptions = {}) {
    this.threshold = options.failureThreshold ?? DEFAULT_THRESHOLD;
    if (!(Number.isInteger(this.threshold) && this.threshold >= 1)) {
      throw DataverseInvalidRequestError.invalidParameter(
        "circuitBreaker.failureThreshold",
        `must be a whole number of at least 1 (got ${String(this.threshold)})`
      );
    }
    this.breakMs = options.breakDurationMs ?? DEFAULT_BREAK_MS;
    if (!(Number.isFinite(this.breakMs) && this.breakMs >= 0)) {
      throw DataverseInvalidRequestError.invalidParameter(
        "circuitBreaker.breakDurationMs",
        `must be a number of at least 0 (got ${String(this.breakMs)})`
      );
    }
    this.isFailure = options.isFailure ?? defaultIsFailure;
  }

  /**
   * The state now. An open circuit whose `breakDurationMs` has passed reads as `"half-open"`: the
   * next request is the probe.
   */
  get state(): CircuitState {
    if (this.current === "open" && Date.now() - this.openedAt >= this.breakMs) return "half-open";
    return this.current;
  }

  /** Failures in a row so far. */
  get consecutiveFailures(): number {
    return this.failures;
  }

  /** Close the circuit and forget the failures, e.g. after fixing a configuration problem. */
  reset(): void {
    this.probing = false;
    this.failures = 0;
    this.transition("closed");
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const isProbe = this.admit(ctx);
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
      this.record(outcome, isProbe, ctx);
    }
  }

  /** A failure as `isFailure` says; otherwise a success below 400, and neutral from 400 up. */
  private classify(status: number): Outcome {
    if (this.isFailure(status)) return "failure";
    return status < 400 ? "success" : "neutral";
  }

  /** Let the request through (true when it is the probe), or throw `DataverseCircuitOpenError`. */
  private admit(ctx: MiddlewareContext): boolean {
    if (this.current === "open") {
      const remaining = this.openedAt + this.breakMs - Date.now();
      if (remaining > 0) {
        throw new DataverseCircuitOpenError(
          `Circuit open after ${String(this.failures)} failures in a row; not sending the request`,
          remaining
        );
      }
      this.transition("half-open", ctx);
    }
    if (this.current === "half-open") {
      if (this.probing) {
        throw new DataverseCircuitOpenError(
          "Circuit half-open and a probe request is in flight; not sending the request"
        );
      }
      this.probing = true;
      return true;
    }
    return false;
  }

  private record(outcome: Outcome, isProbe: boolean, ctx: MiddlewareContext): void {
    if (isProbe) {
      this.probing = false;
      if (outcome === "success") {
        this.failures = 0;
        this.transition("closed", ctx);
      } else if (outcome === "failure") {
        this.failures++;
        this.open(ctx);
      }
      // Neutral (a 429 or another 4xx, or an aborted request): stay half-open, and let the next
      // request probe. A 429 doesn't show the service handles requests again, and it did answer.
      return;
    }
    // Requests that started before the circuit opened don't change it once it has.
    if (this.current !== "closed") return;
    if (outcome === "success") this.failures = 0;
    else if (outcome === "failure") {
      this.failures++;
      if (this.failures >= this.threshold) this.open(ctx);
    }
  }

  private open(ctx: MiddlewareContext): void {
    this.openedAt = Date.now();
    this.transition("open", ctx);
  }

  private transition(to: CircuitState, ctx?: MiddlewareContext): void {
    const from = this.current;
    if (from === to) return;
    this.current = to;
    const change: CircuitStateChange = { from, to, consecutiveFailures: this.failures };
    if (to === "open") {
      ctx?.logger?.warn("Circuit breaker opened", { ...change, breakDurationMs: this.breakMs });
    } else {
      ctx?.logger?.info(`Circuit breaker ${to}`, change);
    }
    try {
      this.options.onStateChange?.(change);
    } catch {
      // A telemetry hook must not change what the request sees.
    }
  }
}
