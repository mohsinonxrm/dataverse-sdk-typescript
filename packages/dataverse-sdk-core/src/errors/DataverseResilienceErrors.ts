import { DataverseError } from "./DataverseError.js";
import {
  DataverseQueueFullError,
  type DataverseQueueFullDetails,
} from "./DataverseQueueFullError.js";

/**
 * `CircuitBreakerMiddleware` refused a request without sending it: the circuit is open after
 * repeated server or network failures, or a probe request is already testing whether the service
 * is back.
 */
export class DataverseCircuitOpenError extends DataverseError {
  /**
   * How long until the circuit lets a probe request through, in ms. `undefined` when a probe is
   * already in flight (its result decides).
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
