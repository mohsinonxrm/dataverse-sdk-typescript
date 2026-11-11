import { DataverseError } from "./DataverseError.js";

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
