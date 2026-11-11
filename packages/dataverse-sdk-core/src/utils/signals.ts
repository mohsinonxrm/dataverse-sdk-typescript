/**
 * Abort-signal plumbing that never leaves listeners behind on a caller's signal. A long-lived
 * signal shared by many requests (an app-wide "cancel everything") must not gain one listener per
 * request (#46).
 */

import { systemClock, type Clock } from "./clock.js";

/** A signal that aborts when any of its sources does, and how to detach it from them. */
export interface LinkedSignal {
  signal: AbortSignal | undefined;
  /** Detach from the sources. A no-op when nothing was attached. */
  dispose(): void;
}

type AnySignal = (signals: AbortSignal[]) => AbortSignal;

/**
 * Combine signals. With one source the source itself is returned, so nothing is attached. With
 * several, `AbortSignal.any()` is used where it exists (the sources then hold the result weakly,
 * with no listener); otherwise a listener is added to each source and removed by `dispose()`.
 */
export function linkSignals(...sources: Array<AbortSignal | undefined>): LinkedSignal {
  const signals = sources.filter((s): s is AbortSignal => s !== undefined);
  const aborted = signals.find((s) => s.aborted);
  if (aborted) return { signal: aborted, dispose: noop };
  if (signals.length <= 1) return { signal: signals[0], dispose: noop };

  const any = (AbortSignal as unknown as { any?: AnySignal }).any;
  if (typeof any === "function") return { signal: any.call(AbortSignal, signals), dispose: noop };

  const controller = new AbortController();
  const onAbort = (event: Event) => {
    controller.abort((event.target as AbortSignal).reason);
    dispose();
  };
  const dispose = () => {
    for (const s of signals) s.removeEventListener("abort", onAbort);
  };
  for (const s of signals) s.addEventListener("abort", onAbort);
  return { signal: controller.signal, dispose };
}

/** A deadline for a whole request: its signal aborts after `ms`, or when `caller` aborts. */
export interface Deadline extends LinkedSignal {
  signal: AbortSignal;
  /** True once the deadline has passed (as opposed to the caller aborting). */
  readonly expired: boolean;
  /** When the deadline passes, in ms since the epoch, on the clock it was started with. */
  readonly at: number;
}

/**
 * Start a deadline of `ms` linked to `caller`, timed by `clock` (its `now()` and `sleep()`). Call
 * `dispose()` when the request is done.
 */
export function startDeadline(ms: number, caller: AbortSignal | undefined, clock: Clock): Deadline {
  const controller = new AbortController();
  let expired = false;
  const at = clock.now() + ms;
  const onTimeout = () => {
    expired = true;
    controller.abort(new DOMException(`Request timed out after ${String(ms)}ms`, "TimeoutError"));
  };
  let stop: () => void;
  if (clock === systemClock) {
    const t = setTimeout(onTimeout, ms);
    stop = () => {
      clearTimeout(t);
    };
  } else {
    // Another clock (a fake one in tests) times it with its sleep, which dispose() ends.
    const timer = new AbortController();
    clock.sleep(ms, timer.signal).then(onTimeout, noop);
    stop = () => {
      timer.abort();
    };
  }
  const linked = linkSignals(caller, controller.signal);
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- two sources, so never undefined
    signal: linked.signal!,
    get expired() {
      return expired;
    },
    at,
    dispose() {
      stop();
      linked.dispose();
    },
  };
}

/** Whether `err` is the `TimeoutError` a timed-out signal aborts with (`AbortSignal.timeout()`). */
export function isTimeoutError(err: unknown): boolean {
  return err instanceof Error && err.name === "TimeoutError";
}

/**
 * The error a wait rejects with when `signal` aborts, matching what fetch throws: the signal's
 * `TimeoutError` reason when it timed out, otherwise an `AbortError`.
 */
export function abortError(signal: AbortSignal | undefined): Error {
  const reason: unknown = signal?.reason;
  return isTimeoutError(reason) ? (reason as Error) : new DOMException("Aborted", "AbortError");
}

function noop(): void {
  // nothing attached
}
