/**
 * @fileoverview Error classes for batch operations
 */

import { DataverseError } from "@mohsinonxrm/dataverse-sdk-core";
import type { BatchResponseStep } from "./types.js";

/**
 * Error thrown when batch operations fail
 */
export class DataverseBatchError extends DataverseError {
  /**
   * Individual request errors mapped by request ID
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
   * Creates a new DataverseBatchError
   *
   * @param message - Error message
   * @param requestErrors - Map of request ID to error response
   * @param totalRequests - Total number of requests
   * @param successfulRequests - Number of successful requests
   * @param failedRequests - Number of failed requests
   */
  constructor(
    message: string,
    requestErrors: Map<string, BatchResponseStep>,
    totalRequests: number,
    successfulRequests: number,
    failedRequests: number
  ) {
    super(message);
    this.name = "DataverseBatchError";
    this.requestErrors = requestErrors;
    this.totalRequests = totalRequests;
    this.successfulRequests = successfulRequests;
    this.failedRequests = failedRequests;

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
