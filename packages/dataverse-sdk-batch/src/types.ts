/**
 * @fileoverview Core types and interfaces for batch operations
 */

/**
 * Represents a single request in a batch
 */
export interface BatchRequestStep {
  /**
   * Unique identifier for this request within the batch
   * Used for referencing in Content-ID and dependsOn
   */
  id: string;

  /**
   * HTTP method for the request
   */
  method: string;

  /**
   * Request URL (relative to base URL or absolute)
   */
  url: string;

  /**
   * Request headers
   */
  headers?: Record<string, string>;

  /**
   * Request body (will be JSON stringified if object)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;

  /**
   * Array of request IDs this request depends on
   * Used in change sets for Content-ID references
   */
  dependsOn?: string[];
}

/**
 * Represents a parsed response from a batch operation
 */
export interface BatchResponseStep {
  /**
   * Request ID this response corresponds to
   */
  id: string;

  /**
   * HTTP status code
   */
  status: number;

  /**
   * HTTP status text
   */
  statusText?: string;

  /**
   * Response headers
   */
  headers: Record<string, string>;

  /**
   * Parsed response body
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

/**
 * Options for batch execution
 */
export interface BatchExecutionOptions {
  /**
   * Whether to continue processing remaining requests if one fails
   * Maps to Prefer: odata.continue-on-error header
   * @default false
   */
  continueOnError?: boolean;

  /**
   * Maximum requests per batch before auto-splitting
   * @default 10
   */
  batchSize?: number;

  /**
   * Additional headers to include in the batch request
   */
  headers?: Record<string, string>;
}

/**
 * Result of a batch execution
 */
export interface BatchExecutionResult {
  /**
   * Map of request ID to response
   */
  responses: Map<string, BatchResponseStep>;

  /**
   * Any requests that failed
   */
  errors: Map<string, Error>;

  /**
   * Whether all requests succeeded
   */
  success: boolean;

  /**
   * Total number of requests processed
   */
  totalRequests: number;

  /**
   * Number of successful requests
   */
  successfulRequests: number;

  /**
   * Number of failed requests
   */
  failedRequests: number;
}
