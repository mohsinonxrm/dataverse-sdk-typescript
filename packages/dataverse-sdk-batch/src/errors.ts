/**
 * @fileoverview Error classes for batch operations
 */

import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import type { BatchExecutionResult, BatchResponseStep } from "./types.js";

/** Extra details for {@link DataverseBatchError}. */
export interface DataverseBatchErrorInit {
  /** The whole result: every response received, the typed errors, and the skipped requests. */
  result?: BatchExecutionResult;
  /** The underlying error, e.g. the typed error of a split batch that failed as a whole. */
  cause?: unknown;
}

/**
 * Error thrown when batch operations fail
 */
export class DataverseBatchError extends DataverseError {
  /**
   * The failed requests' responses, keyed by request id. Successful responses are in
   * `result.responses`.
   */
  public readonly requestErrors: Map<string, BatchResponseStep>;

  /**
   * Total number of requests in the batch
   */
  public readonly totalRequests: number;

  /**
   * Number of successful requests
   */
  public readonly successfulRequests: number;

  /**
   * Number of failed requests
   */
  public readonly failedRequests: number;

  /**
   * The whole execution result (set when thrown by `BatchRequestBuilder.execute()`): every
   * response received, in order, the typed per-request errors, and the requests that got no
   * response (`skippedRequestIds`, `stoppedEarly`).
   */
  public readonly result?: BatchExecutionResult;

  /**
   * Creates a new DataverseBatchError
   *
   * @param message - Error message
   * @param requestErrors - Map of request ID to error response
   * @param totalRequests - Total number of requests
   * @param successfulRequests - Number of successful requests
   * @param failedRequests - Number of failed requests
   * @param init - The whole result, and the underlying error
   */
  constructor(
    message: string,
    requestErrors: Map<string, BatchResponseStep>,
    totalRequests: number,
    successfulRequests: number,
    failedRequests: number,
    init: DataverseBatchErrorInit = {}
  ) {
    super(message, init.cause !== undefined ? { cause: init.cause } : undefined);
    this.name = "DataverseBatchError";
    this.requestErrors = requestErrors;
    this.totalRequests = totalRequests;
    this.successfulRequests = successfulRequests;
    this.failedRequests = failedRequests;
    this.result = init.result;

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, DataverseBatchError.prototype);
  }

  /**
   * Gets the error for a specific request ID
   *
   * @param requestId - The request ID
   * @returns The error response or undefined
   */
  getErrorForRequest(requestId: string): BatchResponseStep | undefined {
    return this.requestErrors.get(requestId);
  }

  /**
   * Checks if a specific request failed
   *
   * @param requestId - The request ID
   * @returns True if the request failed
   */
  hasErrorForRequest(requestId: string): boolean {
    return this.requestErrors.has(requestId);
  }

  /**
   * Gets all failed request IDs
   *
   * @returns Array of failed request IDs
   */
  getFailedRequestIds(): string[] {
    return Array.from(this.requestErrors.keys());
  }
}
