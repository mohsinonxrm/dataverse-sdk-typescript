import { DataverseError } from "./DataverseError.js";

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
 * requests in flight and the most waiting (`maxQueue`).
 */
export class DataverseBulkheadRejectedError extends DataverseError {
  /** The request's category, e.g. `"write"`. */
  readonly category: string;

  constructor(message: string, category: string) {
    super(message);
    Object.setPrototypeOf(this, DataverseBulkheadRejectedError.prototype);
    this.name = "DataverseBulkheadRejectedError";
    this.category = category;
  }
}
