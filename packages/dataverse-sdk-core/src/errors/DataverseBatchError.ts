import { DataverseError, type DataverseErrorInit } from "./DataverseError.js";

/** One failed part of a `$batch`: its position in the batch, HTTP status and typed error. */
export interface DataverseBatchPartError {
  index: number;
  status: number;
  error: DataverseError;
}

/** Extra details for {@link DataverseBatchError}. */
export interface DataverseBatchErrorInit<TResult = unknown> extends DataverseErrorInit {
  /** The failed parts, in request order. */
  partErrors?: DataverseBatchPartError[];
  /**
   * The whole execution result: every response received, the typed errors, and the skipped
   * requests. `BatchRequestBuilder.execute()` sets a `BatchExecutionResult`.
   */
  result?: TResult;
}

/**
 * The one error class for a failed `$batch`: `@mohsinonxrm/dataverse-sdk-batch` re-exports it and
 * its `execute()` throws it, so `instanceof` works whichever package you import it from.
 *
 * `partErrors` lists the failed parts; `result` holds the whole execution result;
 * `requestErrors` holds the failed responses keyed by request id.
 */
// The batch package narrows TResult/TStep to its own result and step types.
export class DataverseBatchError<TResult = unknown, TStep = unknown> extends DataverseError {
  /** The failed parts in request order (index, status and typed error). */
  public readonly partErrors?: DataverseBatchPartError[];
  /** The failed requests' responses, keyed by request id. */
  public readonly requestErrors: Map<string, TStep>;
  /** Total number of requests in the batch. */
  public readonly totalRequests: number;
  /** Number of successful requests. */
  public readonly successfulRequests: number;
  /** Number of failed requests. */
  public readonly failedRequests: number;
  /**
   * The whole execution result (set when thrown by `BatchRequestBuilder.execute()`): every
   * response received, in order, the typed per-request errors, and the requests that got no
   * response (`skippedRequestIds`, `stoppedEarly`).
   */
  public readonly result?: TResult;

  /** Short form: a message and details only. */
  constructor(message: string, init?: DataverseBatchErrorInit<TResult>);
  /** Full form, as thrown by `BatchRequestBuilder.execute()`. */
  constructor(
    message: string,
    requestErrors: Map<string, TStep>,
    totalRequests: number,
    successfulRequests: number,
    failedRequests: number,
    init?: DataverseBatchErrorInit<TResult>
  );
  constructor(
    message: string,
    second?: Map<string, TStep> | DataverseBatchErrorInit<TResult>,
    totalRequests = 0,
    successfulRequests = 0,
    failedRequests = 0,
    third?: DataverseBatchErrorInit<TResult>
  ) {
    const requestErrors = second instanceof Map ? second : undefined;
    const init = requestErrors ? third : (second as DataverseBatchErrorInit<TResult> | undefined);
    super(message, init);
    this.name = "DataverseBatchError";
    this.requestErrors = requestErrors ?? new Map<string, TStep>();
    this.totalRequests = totalRequests;
    this.successfulRequests = successfulRequests;
    this.failedRequests = failedRequests;
    this.partErrors = init?.partErrors;
    this.result = init?.result;
    // Keep the prototype chain intact for instanceof checks.
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /** Gets the error response for a request id. */
  getErrorForRequest(requestId: string): TStep | undefined {
    return this.requestErrors.get(requestId);
  }

  /** Whether a specific request failed. */
  hasErrorForRequest(requestId: string): boolean {
    return this.requestErrors.has(requestId);
  }

  /** Ids of the failed requests. */
  getFailedRequestIds(): string[] {
    return Array.from(this.requestErrors.keys());
  }
}
