import { DataverseError } from "./DataverseError.js";
import {
  DataverseQueueFullError,
  type DataverseQueueFullDetails,
} from "./DataverseQueueFullError.js";

/**
 * `CircuitBreakerMiddleware` refused a request without sending it: the circuit is open after
 * repeated server or network failures, a probe request is already testing whether the service
 * is back, or the circuit was isolated with `isolate()`.
 */
export class DataverseCircuitOpenError extends DataverseError {
  /**
   * How long until the circuit lets a request through, in ms: while it is open, the time until it
   * turns half-open and lets a probe through; while a probe is in flight, the time until another
   * request may probe (the rest of a break duration counted from when the probe started; the
   * probe's result may close the circuit sooner). `undefined` while it is isolated with
   * `isolate()`, which lasts until `reset()`.
   */
  readonly retryAfterMs?: number;

  constructor(message: string, retryAfterMs?: number) {
    super(message);
    Object.setPrototypeOf(this, DataverseCircuitOpenError.prototype);
    this.name = "DataverseCircuitOpenError";
    this.retryAfterMs = retryAfterMs;
  }
}

/**
 * `BulkheadMiddleware` refused a request without sending it: its category already had the most
 * requests in flight and the most waiting (`maxQueue`). A `DataverseQueueFullError` with
 * `queue: "bulkhead"`, so one `instanceof DataverseQueueFullError` check covers this and the
 * concurrency queue.
 */
export class DataverseBulkheadRejectedError extends DataverseQueueFullError {
  /** The request's category, e.g. `"write"`. */
  readonly category: string;

  /**
   * @param details - The queue's state; each value is 0 when omitted.
   */
  constructor(message: string, category: string, details?: DataverseQueueFullDetails) {
    super(message, "bulkhead", details ?? { maxQueue: 0, queued: 0, inFlight: 0, limit: 0 });
    Object.setPrototypeOf(this, DataverseBulkheadRejectedError.prototype);
    this.name = "DataverseBulkheadRejectedError";
    this.category = category;
  }
}
