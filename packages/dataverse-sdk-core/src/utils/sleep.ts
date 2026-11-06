import { abortError } from "./signals.js";

/**
 * Wait `ms`, or reject as soon as `signal` aborts: with its `TimeoutError` when it timed out,
 * otherwise with an `AbortError`. The abort listener is removed when the wait ends either way, so
 * a long-lived signal doesn't collect listeners (#46).
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) return Promise.reject(abortError(signal));
  if (ms <= 0) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(t);
      reject(abortError(signal));
    };
    const t = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}
