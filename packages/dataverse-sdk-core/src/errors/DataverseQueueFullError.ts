import { DataverseError } from "./DataverseError.js";

/** Which queue refused a request (see `DataverseQueueFullError.queue`). */
export type DataverseQueueName = "concurrency" | "bulkhead";

/** What `DataverseQueueFullError` reports about the queue that refused a request. */
export interface DataverseQueueFullDetails {
  /** The queue's bound (`concurrency.maxQueue` or `BulkheadOptions.maxQueue`). */
  maxQueue: number;
  /** Requests waiting in the queue when this one was refused. */
  queued: number;
  /** Requests holding a slot when this one was refused. */
  inFlight: number;
  /** The slot limit in force then. */
  limit: number;
}

/**
 * A request was refused without being sent: every slot was taken and the queue of requests
 * waiting for one was already at its bound. `queue` says which: `"concurrency"` (the client's
 * `concurrency.maxQueue`) or `"bulkhead"` (`BulkheadMiddleware`'s `maxQueue`, thrown as its
 * subclass `DataverseBulkheadRejectedError`). Nothing reached Dataverse, so the request is safe to
 * send again later.
 */
export class DataverseQueueFullError extends DataverseError {
  /** The queue that was full. */
  readonly queue: DataverseQueueName;
  /** The queue's bound. */
  readonly maxQueue: number;
  /** Requests waiting in the queue when this one was refused. */
  readonly queued: number;
  /** Requests holding a slot when this one was refused. */
  readonly inFlight: number;
  /** The slot limit in force then. */
  readonly limit: number;

  constructor(message: string, queue: DataverseQueueName, details: DataverseQueueFullDetails) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "DataverseQueueFullError";
    this.queue = queue;
    this.maxQueue = details.maxQueue;
    this.queued = details.queued;
    this.inFlight = details.inFlight;
    this.limit = details.limit;
  }
}
