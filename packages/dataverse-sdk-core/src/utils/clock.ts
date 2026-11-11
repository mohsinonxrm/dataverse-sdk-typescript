import { sleep } from "./sleep.js";

/**
 * Time, as middleware that waits sees it: the current time and a wait. Pass your own (for example
 * the testing package's fake clock) to test waits without waiting. Today `ChaosMiddleware` uses
 * it (`ChaosOptions.clock`, for latency and hang faults).
 */
export interface Clock {
  /** The current time in ms since the epoch, as `Date.now()`. */
  now(): number;
  /**
   * Wait `ms`. When `signal` aborts first, reject at once: with the signal's `TimeoutError` reason
   * when it timed out, otherwise with an `AbortError` (as `fetch` does).
   */
  sleep(ms: number, signal?: AbortSignal): Promise<void>;
}

/** The real clock: `Date.now()` and `setTimeout`. */
export const systemClock: Clock = {
  now: () => Date.now(),
  sleep: (ms, signal) => sleep(ms, signal),
};
