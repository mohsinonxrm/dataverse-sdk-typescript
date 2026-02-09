/**
 * @fileoverview Main BatchRequestBuilder class for creating and executing batch requests
 */

import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  BatchRequestStep,
  BatchExecutionOptions,
  BatchExecutionResult,
  BatchResponseStep,
} from "./types.js";
import { DataverseBatchError } from "./errors.js";
import { generateBoundary, encodeBatchRequest } from "./encoding.js";
import { decodeBatchResponse } from "./decoding.js";

/**
 * Builder for creating and executing Dataverse batch requests
 *
 * @example
 * ```typescript
 * const batch = new BatchRequestBuilder(client);
 *
 * // Add individual requests
 * batch.addRequest('req1', 'GET', '/accounts?$top=5');
 * batch.addRequest('req2', 'POST', '/accounts', undefined, { name: 'Test' });
 *
 * // Add a changeset
 * batch.beginChangeset();
 * batch.addRequest('req3', 'POST', '/accounts', undefined, { name: 'Account 1' });
 * batch.addRequest('req4', 'POST', '/contacts', ['req3'], { firstname: 'John' });
 * batch.endChangeset();
 *
 * // Execute
 * const result = await batch.execute();
 * ```
 */
export class BatchRequestBuilder {
  private client: DataverseClient;
  private requests: BatchRequestStep[] = [];
  private changesets: BatchRequestStep[][] = [];
  private currentChangeset: BatchRequestStep[] | null = null;
  private requestIdSet = new Set<string>();

  /**
   * Maximum requests allowed by Dataverse per batch
   */
  private static readonly MAX_BATCH_SIZE = 1000;

  /**
   * Default batch size for auto-splitting
   */
  private static readonly DEFAULT_BATCH_SIZE = 10;

  /**
   * Creates a new batch request builder
   *
   * @param client - The Dataverse client instance
   */
  constructor(client: DataverseClient) {
    this.client = client;
  }

  /**
   * Adds a request to the batch
   *
   * @param id - Unique identifier for this request
   * @param method - HTTP method (GET, POST, PATCH, DELETE, etc.)
   * @param url - Request URL (relative to API base or absolute)
   * @param headers - Optional request headers
   * @param body - Optional request body
   * @param dependsOn - Optional array of request IDs this request depends on
   * @returns This builder for chaining
   *
   * @example
   * ```typescript
   * batch.addRequest('get-account', 'GET', '/accounts(id)?$select=name');
   * batch.addRequest('create-contact', 'POST', '/contacts', undefined, {
   *   firstname: 'John',
   *   lastname: 'Doe'
   * });
   * ```
   */
  addRequest(
    id: string,
    method: string,
    url: string,
    headers?: Record<string, string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    dependsOn?: string[]
  ): this {
    // Validate ID uniqueness
    if (this.requestIdSet.has(id)) {
      throw new DataverseInvalidRequestError(
        `Duplicate request ID: ${id}. Each request must have a unique ID.`
      );
    }

    const request: BatchRequestStep = {
      id,
      method: method.toUpperCase(),
      url: this.normalizeUrl(url),
      headers,
      body,
      dependsOn,
    };

    // Add to current changeset or to individual requests
    if (this.currentChangeset) {
      this.currentChangeset.push(request);
    } else {
      this.requests.push(request);
    }

    this.requestIdSet.add(id);
    return this;
  }

  /**
   * Begins a new changeset (transactional group of requests)
   *
   * All requests added between beginChangeset() and endChangeset()
   * will be executed as a single transaction - either all succeed or all fail.
   *
   * @returns This builder for chaining
   *
   * @example
   * ```typescript
   * batch.beginChangeset();
   * batch.addRequest('req1', 'POST', '/accounts', undefined, { name: 'Account 1' });
   * batch.addRequest('req2', 'POST', '/contacts', ['req1'], {
   *   firstname: 'John',
   *   'parentcustomerid_account@odata.bind': '/accounts($1)'
   * });
   * batch.endChangeset();
   * ```
   */
  beginChangeset(): this {
    if (this.currentChangeset) {
      throw new DataverseInvalidRequestError(
        "Cannot nest changesets. Call endChangeset() before starting a new one."
      );
    }

    this.currentChangeset = [];
    return this;
  }

  /**
   * Ends the current changeset
   *
   * @returns This builder for chaining
   */
  endChangeset(): this {
    if (!this.currentChangeset) {
      throw new DataverseInvalidRequestError("No active changeset. Call beginChangeset() first.");
    }

    if (this.currentChangeset.length === 0) {
      throw new DataverseInvalidRequestError(
        "Changeset cannot be empty. Add at least one request before calling endChangeset()."
      );
    }

    this.changesets.push(this.currentChangeset);
    this.currentChangeset = null;
    return this;
  }

  /**
   * Gets the total number of requests (including those in changesets)
   *
   * @returns Total request count
   */
  getTotalRequestCount(): number {
    let total = this.requests.length;
    for (const changeset of this.changesets) {
      total += changeset.length;
    }
    if (this.currentChangeset) {
      total += this.currentChangeset.length;
    }
    return total;
  }

  /**
   * Normalizes URL to be relative to API base
   *
   * @param url - The URL to normalize
   * @returns Normalized URL
   */
  private normalizeUrl(url: string): string {
    // If absolute URL, leave as-is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // If starts with /, remove it (will be relative to API base)
    if (url.startsWith("/")) {
      return url.substring(1);
    }

    return url;
  }

  /**
   * Executes the batch request
   *
   * @param options - Execution options
   * @returns Batch execution result
   *
   * @example
   * ```typescript
   * // Execute with continue-on-error
   * const result = await batch.execute({ continueOnError: true });
   *
   * // Check results
   * if (!result.success) {
   *   for (const [id, error] of result.errors) {
   *     console.error(`Request ${id} failed:`, error);
   *   }
   * }
   * ```
   */
  async execute(options: BatchExecutionOptions = {}): Promise<BatchExecutionResult> {
    // Ensure no open changeset
    if (this.currentChangeset) {
      throw new DataverseInvalidRequestError(
        "Cannot execute batch with an open changeset. Call endChangeset() first."
      );
    }

    const totalRequests = this.getTotalRequestCount();

    // Validate request count
    if (totalRequests === 0) {
      throw new DataverseInvalidRequestError(
        "Cannot execute empty batch. Add at least one request."
      );
    }

    // Check if auto-split is needed
    const batchSize = options.batchSize ?? BatchRequestBuilder.DEFAULT_BATCH_SIZE;
    if (totalRequests > BatchRequestBuilder.MAX_BATCH_SIZE) {
      // Auto-split into multiple batches
      return await this.executeWithSplit(options, batchSize);
    }

    // Single batch execution
    return await this.executeSingleBatch(options);
  }

  /**
   * Executes a single batch (no splitting)
   *
   * @param options - Execution options
   * @returns Batch execution result
   */
  private async executeSingleBatch(options: BatchExecutionOptions): Promise<BatchExecutionResult> {
    // Generate batch body
    const boundary = generateBoundary();
    const batchBody = encodeBatchRequest(this.requests, this.changesets, boundary);

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": `multipart/mixed; boundary=${boundary}`,
      ...(options.headers ?? {}),
    };

    if (options.continueOnError) {
      headers.Prefer = "odata.continue-on-error";
    }

    // Send request
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const response = (await this.client.api("/$batch").post(batchBody, headers)) as {
      headers: Headers;
      text: () => Promise<string>;
    };

    // Parse response
    const contentType = response.headers.get("Content-Type");
    if (!contentType) {
      throw new Error("No Content-Type header in batch response");
    }

    const responseBody = await response.text();
    const parsedResponses = decodeBatchResponse(responseBody, contentType);

    // Build result
    return this.buildResult(parsedResponses);
  }

  /**
   * Executes batch with auto-splitting
   *
   * @param options - Execution options
   * @param batchSize - Size of each split batch
   * @returns Aggregated batch execution result
   */
  private executeWithSplit(
    _options: BatchExecutionOptions,
    _batchSize: number
  ): Promise<BatchExecutionResult> {
    // For simplicity in v1, throw error requiring manual split
    // Auto-split implementation would split requests/changesets into multiple batches
    throw new DataverseInvalidRequestError(
      `Batch contains ${String(this.getTotalRequestCount())} requests, exceeding the maximum of ${String(BatchRequestBuilder.MAX_BATCH_SIZE)}. ` +
        `Please split into multiple batches manually.`
    );
  }

  /**
   * Builds execution result from parsed responses
   *
   * @param parsedResponses - Parsed response map
   * @returns Batch execution result
   */
  private buildResult(parsedResponses: Map<string, BatchResponseStep>): BatchExecutionResult {
    const responses = new Map<string, BatchResponseStep>();
    const errors = new Map<string, Error>();
    let successfulRequests = 0;
    let failedRequests = 0;

    for (const [id, response] of parsedResponses) {
      responses.set(id, response);

      if (response.status >= 200 && response.status < 300) {
        successfulRequests++;
      } else {
        failedRequests++;
        const error = new Error(
          `HTTP ${String(response.status)}${response.statusText ? " " + response.statusText : ""}: ${
            response.body ? JSON.stringify(response.body) : "No response body"
          }`
        );
        errors.set(id, error);
      }
    }

    const result: BatchExecutionResult = {
      responses,
      errors,
      success: failedRequests === 0,
      totalRequests: this.getTotalRequestCount(),
      successfulRequests,
      failedRequests,
    };

    // If there were errors and not continueOnError, throw
    if (failedRequests > 0) {
      const errorResponses = new Map<string, BatchResponseStep>();
      for (const [id, response] of parsedResponses) {
        if (response.status < 200 || response.status >= 300) {
          errorResponses.set(id, response);
        }
      }

      throw new DataverseBatchError(
        `Batch request failed with ${String(failedRequests)} error(s) out of ${String(result.totalRequests)} request(s)`,
        errorResponses,
        result.totalRequests,
        successfulRequests,
        failedRequests
      );
    }

    return result;
  }

  /**
   * Clears all requests and changesets from the builder
   *
   * @returns This builder for chaining
   */
  clear(): this {
    this.requests = [];
    this.changesets = [];
    this.currentChangeset = null;
    this.requestIdSet.clear();
    return this;
  }
}
