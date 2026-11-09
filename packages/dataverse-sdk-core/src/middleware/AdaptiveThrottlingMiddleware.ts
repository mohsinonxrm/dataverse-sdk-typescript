import type { Middleware, NextMiddleware } from "../abstractions/middleware.js";
import type { MiddlewareContext, RequestInformation } from "../abstractions/http.js";
import { DataverseInvalidRequestError } from "../errors/NamedErrors.js";
import { parseRetryAfter } from "../utils/HeaderUtils.js";
import { sleep } from "../utils/sleep.js";

/** Remaining number of requests, per web server and user, in the 5-minute window. */
const REQUESTS_HEADER = "x-ms-ratelimit-burst-remaining-xrm-requests";
/** Remaining combined execution time for the user, in the 5-minute window. */
const TIME_HEADER = "x-ms-ratelimit-time-remaining-xrm-requests";
/** Service protection limits use a 5-minute sliding window; older readings say nothing. */
const WINDOW_MS = 300_000;

/** Settings of `AdaptiveThrottlingMiddleware`. */
export interface AdaptiveThrottlingOptions {
  /**
   * Start slowing down when what is left of either budget falls below this share of the full
   * budget (0 to 1). @default 0.2
   */
  threshold?: number;
  /**
   * Gap between the starts of two requests when a budget is used up, in ms. Between `threshold`
   * and empty, the gap grows in proportion. @default 2000
   */
  maxSpacingMs?: number;
  /**
   * The full value of `x-ms-ratelimit-burst-remaining-xrm-requests` (requests per 5 minutes).
   * @default the highest value seen
   */
  requestBudget?: number;
  /**
   * The full value of `x-ms-ratelimit-time-remaining-xrm-requests` (execution time per 5 minutes,
   * in the header's own unit). @default the highest value seen
   */
  timeBudget?: number;
  /**
   * After a 429 with `Retry-After`, hold every new request until it has passed: Dataverse rejects
   * the user's requests until then anyway. @default true
   */
  pauseOnRetryAfter?: boolean;
  /** Longest such pause, in ms; a longer `Retry-After` is cut to this. @default 30000 */
  maxPauseMs?: number;
  /**
   * Called before each request the middleware holds back. It must not throw; an error it throws
   * is ignored.
   */
  onDelay?: (delay: AdaptiveThrottlingDelay) => void;
}

/** What `AdaptiveThrottlingOptions.onDelay` receives. */
export interface AdaptiveThrottlingDelay {
  /** How long the request waits, in ms. */
  delayMs: number;
  /** `"retry-after"` while a 429's pause is in force, otherwise `"pressure"` (a budget is low). */
  reason: "pressure" | "retry-after";
  /** Pressure when the request arrived, from 0 to 1 (see `AdaptiveThrottlingStatus.pressure`). */
  pressure: number;
  /** The request held back. Treat it as read-only. */
  request: RequestInformation;
}

/** What `AdaptiveThrottlingMiddleware.status` reports. */
export interface AdaptiveThrottlingStatus {
  /** The last `x-ms-ratelimit-burst-remaining-xrm-requests` read (within 5 minutes). */
  requestsRemaining?: number;
  /** The full request budget it is measured against. */
  requestBudget?: number;
  /** The last `x-ms-ratelimit-time-remaining-xrm-requests` read (within 5 minutes). */
  timeRemaining?: number;
  /** The full time budget it is measured against. */
  timeBudget?: number;
  /** 0 when both budgets are above `threshold`, rising to 1 when one is used up. */
  pressure: number;
  /** Gap between request starts at this pressure, in ms. */
  spacingMs: number;
  /** When the pause after a 429 ends (ms since the epoch), while one is in force. */
  pausedUntil?: number;
}

/** One budget, as the headers report it. */
class Budget {
  remaining?: number;
  private highest = 0;
  private readAt = 0;

  constructor(private readonly full?: number) {}

  update(value: number, now: number): void {
    this.remaining = value;
    this.readAt = now;
    this.highest = Math.max(this.highest, value);
  }

  /** The reading, unless it is older than the window. */
  current(now: number): number | undefined {
    return now - this.readAt > WINDOW_MS ? undefined : this.remaining;
  }

  budget(): number | undefined {
    const full = this.full ?? this.highest;
    return full > 0 ? full : undefined;
  }

  /** How full the budget is (0 to 1), or `undefined` without a current reading. */
  fraction(now: number): number | undefined {
    const remaining = this.current(now);
    const budget = this.budget();
    if (remaining === undefined || budget === undefined) return undefined;
    return Math.min(1, remaining / budget);
  }
}

/**
 * Slows requests down before Dataverse throttles them, from the service-protection headers it
 * returns on every response: `x-ms-ratelimit-burst-remaining-xrm-requests` (requests left in the
 * 5-minute window) and `x-ms-ratelimit-time-remaining-xrm-requests` (execution time left). When
 * what is left of either falls below `threshold` of the full budget, it spaces out the starts of
 * requests, up to `maxSpacingMs` apart when a budget is used up. After a 429 with `Retry-After`,
 * it holds every new request until the wait has passed, not just the one that was throttled.
 *
 * Opt-in: it isn't part of the default pipeline. Add it with `middleware.append`, so it sees
 * every attempt's response, 429s included. Use one instance per client: the budgets belong to the
 * user the client signs in as.
 *
 * Microsoft documents the headers as being for debugging, not for controlling how many requests
 * to send. Each web server of an environment counts on its own, and without the affinity cookie
 * (as in Node.js) consecutive responses can come from different servers. So this is a soft
 * brake that lowers the odds of a 429, and the retry middleware still handles the 429s that come.
 * In browsers the headers aren't readable (Dataverse doesn't expose them to CORS), so there only
 * the pause after a 429 applies.
 *
 * @example
 * ```typescript
 * const client = new DataverseClient({
 *   baseUrl,
 *   tokenProvider,
 *   middleware: {
 *     append: [
 *       new AdaptiveThrottlingMiddleware({
 *         threshold: 0.2,
 *         maxSpacingMs: 2000,
 *         onDelay: ({ delayMs, reason }) => console.log(`Holding a request ${delayMs} ms (${reason})`),
 *       }),
 *     ],
 *   },
 * });
 * ```
 */
export class AdaptiveThrottlingMiddleware implements Middleware {
  name = "AdaptiveThrottlingMiddleware";
  private readonly threshold: number;
  private readonly maxSpacingMs: number;
  private readonly maxPauseMs: number;
  private readonly requests: Budget;
  private readonly time: Budget;
  private pausedUntil = 0;
  private nextStart = 0;

  constructor(private readonly options: AdaptiveThrottlingOptions = {}) {
    this.threshold = options.threshold ?? 0.2;
    if (!(this.threshold > 0 && this.threshold <= 1)) {
      throw invalid("threshold", "a number above 0 and at most 1", this.threshold);
    }
    this.maxSpacingMs = nonNegative("maxSpacingMs", options.maxSpacingMs ?? 2000);
    this.maxPauseMs = nonNegative("maxPauseMs", options.maxPauseMs ?? 30_000);
    for (const name of ["requestBudget", "timeBudget"] as const) {
      const value = options[name];
      if (value !== undefined && !(Number.isFinite(value) && value > 0)) {
        throw invalid(name, "a positive number", value);
      }
    }
    this.requests = new Budget(options.requestBudget);
    this.time = new Budget(options.timeBudget);
  }

  /** The budgets as last read, and what they mean for the next request. */
  get status(): AdaptiveThrottlingStatus {
    const now = Date.now();
    const pressure = this.pressure(now);
    const status: AdaptiveThrottlingStatus = {
      pressure,
      spacingMs: pressure * this.maxSpacingMs,
    };
    const requestsRemaining = this.requests.current(now);
    if (requestsRemaining !== undefined) {
      status.requestsRemaining = requestsRemaining;
      status.requestBudget = this.requests.budget();
    }
    const timeRemaining = this.time.current(now);
    if (timeRemaining !== undefined) {
      status.timeRemaining = timeRemaining;
      status.timeBudget = this.time.budget();
    }
    if (this.pausedUntil > now) status.pausedUntil = this.pausedUntil;
    return status;
  }

  async execute(
    request: RequestInformation,
    ctx: MiddlewareContext,
    next: NextMiddleware
  ): Promise<Response> {
    const now = Date.now();
    const pressure = this.pressure(now);
    // Requests take turns: each starts no sooner than the previous one's start plus the spacing.
    const start = Math.max(now, this.pausedUntil, this.nextStart);
    this.nextStart = start + pressure * this.maxSpacingMs;
    const delayMs = start - now;
    if (delayMs > 0) {
      const reason = this.pausedUntil >= start ? "retry-after" : "pressure";
      try {
        this.options.onDelay?.({ delayMs, reason, pressure, request });
      } catch {
        // A progress hook must not change what the request sees.
      }
      ctx.logger?.debug("Holding a request back (service protection)", {
        delayMs,
        reason,
        pressure,
      });
      await sleep(delayMs, request.signal);
    }

    const res = await next(request, ctx);
    this.observe(res, Date.now());
    return res;
  }

  /** 0 while both budgets are above `threshold`; rises to 1 as the lower one empties. */
  private pressure(now: number): number {
    let pressure = 0;
    for (const budget of [this.requests, this.time]) {
      const fraction = budget.fraction(now);
      if (fraction !== undefined && fraction < this.threshold) {
        pressure = Math.max(pressure, (this.threshold - fraction) / this.threshold);
      }
    }
    return Math.min(1, pressure);
  }

  private observe(res: Response, now: number): void {
    const requests = readNumber(res.headers.get(REQUESTS_HEADER));
    if (requests !== undefined) this.requests.update(requests, now);
    const time = readNumber(res.headers.get(TIME_HEADER));
    if (time !== undefined) this.time.update(time, now);
    if (res.status === 429 && this.options.pauseOnRetryAfter !== false) {
      const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));
      if (retryAfterMs !== undefined) {
        this.pausedUntil = Math.max(
          this.pausedUntil,
          now + Math.min(retryAfterMs, this.maxPauseMs)
        );
      }
    }
  }
}

/** `"7999"` or `"1,200.00"`: digits, with thousands separators and decimals. */
function readNumber(value: string | null): number | undefined {
  if (value === null) return undefined;
  const cleaned = value.replace(/[,\s]/g, "");
  if (cleaned === "") return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function nonNegative(name: string, value: number): number {
  if (!(Number.isFinite(value) && value >= 0)) throw invalid(name, "a number of at least 0", value);
  return value;
}

function invalid(name: string, what: string, value: unknown): DataverseInvalidRequestError {
  return DataverseInvalidRequestError.invalidParameter(
    `adaptiveThrottling.${name}`,
    `must be ${what} (got ${String(value)})`
  );
}
