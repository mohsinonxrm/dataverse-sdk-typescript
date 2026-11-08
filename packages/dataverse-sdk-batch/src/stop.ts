/**
 * @fileoverview Cancellation shared by `BatchRequestBuilder.execute()` and the bulk helpers: one
 * signal for a whole execution (the caller's signal plus a `timeoutMs` deadline), and the SDK
 * error to report when it stops the execution.
 */

import {
  DataverseAbortError,
  DataverseError,
  DataverseNetworkError,
} from "@mohsinonxrm/dataverse-sdk-core";

/** The signal an execution sends its requests with: the caller's, plus the `timeoutMs` deadline. */
export interface ExecutionSignal {
  signal: AbortSignal | undefined;
  /** True once `timeoutMs` has passed (as opposed to the caller aborting). */
  readonly expired: boolean;
  /** Stops the timer and detaches from the caller's signal. */
  dispose(): void;
}

/**
 * Starts the signal for one execution. `timeoutMs` covers the whole execution, every request of
 * it included, so it is a deadline signal linked to the caller's rather than a per-request
 * `timeoutMs`.
 */
export function executionSignal(
  caller: AbortSignal | undefined,
  timeoutMs: number | undefined
): ExecutionSignal {
  if (!timeoutMs) return { signal: caller, expired: false, dispose: () => undefined };
  const controller = new AbortController();
  let expired = false;
  const timer = setTimeout(() => {
    if (controller.signal.aborted) return;
    expired = true;
    controller.abort(
      new DOMException(`Request timed out after ${String(timeoutMs)}ms`, "TimeoutError")
    );
  }, timeoutMs);
  const onAbort = (): void => {
    controller.abort(caller?.reason);
  };
  if (caller?.aborted) onAbort();
  else caller?.addEventListener("abort", onAbort, { once: true });
  return {
    signal: controller.signal,
    get expired() {
      return expired;
    },
    dispose() {
      clearTimeout(timer);
      caller?.removeEventListener("abort", onAbort);
    },
  };
}

/**
 * The error for an execution that was stopped, as the client reports a stopped request:
 * `DataverseNetworkError` (`RequestTimeout`) when `timeoutMs` passed or the caller's signal timed
 * out (`AbortSignal.timeout()`), otherwise `DataverseAbortError`.
 */
export function stopError(
  execution: ExecutionSignal,
  timeoutMs: number | undefined,
  cause?: unknown
): DataverseError {
  if (execution.expired) return DataverseNetworkError.timeout(timeoutMs, cause);
  const reason: unknown = execution.signal?.reason;
  if (reason instanceof Error && reason.name === "TimeoutError") {
    return DataverseNetworkError.timeout(undefined, cause ?? reason);
  }
  return new DataverseAbortError(undefined, cause ?? reason);
}

/**
 * The error to report for a request that failed. The client already turns an aborted request into
 * an SDK error; an abort while the response body is read still rejects with the raw
 * `AbortError` (or `TimeoutError`), which becomes the same SDK error here.
 */
export function fromStop(
  err: unknown,
  execution: ExecutionSignal,
  timeoutMs: number | undefined
): unknown {
  if (err instanceof DataverseError || !(err instanceof Error)) return err;
  if (!execution.signal?.aborted) return err;
  if (err.name !== "AbortError" && err.name !== "TimeoutError") return err;
  return stopError(execution, timeoutMs, err);
}
