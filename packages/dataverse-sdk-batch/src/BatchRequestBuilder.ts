/**
 * @fileoverview Main BatchRequestBuilder class for creating and executing batch requests
 */

import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseError,
  DataverseInvalidRequestError,
  normalizeHeaders,
  parseODataError,
} from "@mohsinonxrm/dataverse-sdk-core";
import type {
  BatchItem,
  BatchRequestStep,
  BatchExecutionOptions,
  BatchExecutionResult,
  BatchResponsePart,
  BatchResponseStep,
} from "./types.js";
import { DataverseBatchError } from "./errors.js";
import { generateBoundary, encodeBatchRequest, isChangeset } from "./encoding.js";
import { decodeBatchResponse } from "./decoding.js";

/**
 * Ids used inside a change set become the part's `Content-ID` and are referenced as `$<id>`, so
 * they are limited to characters that are safe in a MIME header and in a URL.
 */
const CONTENT_ID_PATTERN = /^[A-Za-z0-9._~-]+$/;

function headersToRecord(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((value, key) => {
    out[key] = value;
  });
  return out;
}

/** The requests of an item: the request itself, or the requests of a change set. */
function requestsOf(item: BatchItem): BatchRequestStep[] {
  return isChangeset(item) ? item.changeset : [item];
}

/**
 * Builder for creating and executing Dataverse batch requests
 *
 * @example
 * ```typescript
 * const batch = new BatchRequestBuilder(client);
 *
 * // Add individual requests
 * batch.addRequest('who', 'GET', 'WhoAmI');
 * batch.addRequest('top', 'GET', 'accounts?$select=name&$top=5');
 *
 * // Add a changeset; "$acct" refers to the account the first request creates
 * batch.beginChangeset();
 * batch.addRequest('acct', 'POST', 'accounts', undefined, { name: 'Account 1' });
 * batch.addRequest('contact', 'POST', 'contacts', undefined, {
 *   lastname: 'Doe',
 *   'parentcustomerid_account@odata.bind': '$acct'
 * }, ['acct']);
 * batch.endChangeset();
 *
 * // Execute
 * const result = await batch.execute();
 * result.responses.get('who')?.body.UserId;
 * ```
 */
export class BatchRequestBuilder {
  private client: DataverseClient;
  /** Requests and change sets, in the order they were added. */
  private items: BatchItem[] = [];
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
   * Adds a request to the batch, or to the open change set.
   *
   * @param id - Unique identifier for this request. Results are keyed by it. Inside a change
   *   set it is also the part's `Content-ID`, so later requests in the same change set can refer
   *   to the entity it creates as `$<id>` (in the URL or in an `@odata.bind` value); there it may
   *   only contain letters, digits, `.`, `_`, `~` and `-`.
   * @param method - HTTP method (GET, POST, PATCH, DELETE, etc.)
   * @param url - Request URL: relative to the Web API root (`accounts`, `/accounts`), absolute,
   *   or a `$<id>` reference inside a change set
   * @param headers - Optional request headers
   * @param body - Optional request body. Objects are JSON-encoded; strings are sent as they are.
   *   Either way the part gets `Content-Type: application/json; type=entry` unless `headers`
   *   sets one.
   * @param dependsOn - Optional ids of earlier requests in the same change set that this request
   *   refers to with `$<id>`. They are checked here; an id that is not an earlier request of the
   *   open change set throws.
   * @returns This builder for chaining
   *
   * @example
   * ```typescript
   * batch.addRequest('get-account', 'GET', `accounts(${id})?$select=name`);
   * batch.addRequest('create-contact', 'POST', 'contacts', undefined, {
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

    if (this.currentChangeset && !CONTENT_ID_PATTERN.test(id)) {
      throw new DataverseInvalidRequestError(
        `Invalid request ID in a changeset: "${id}". It is sent as the Content-ID, so use only letters, digits, ".", "_", "~" and "-".`
      );
    }

    if (dependsOn?.length) {
      const earlier = new Set((this.currentChangeset ?? []).map((r) => r.id));
      for (const dep of dependsOn) {
        if (!earlier.has(dep)) {
          throw new DataverseInvalidRequestError(
            `Request "${id}" depends on "${dep}", which is not an earlier request in the same changeset. A $<id> reference only works inside one changeset.`
          );
        }
      }
    }

    const request: BatchRequestStep = {
      id,
      method: method.toUpperCase(),
      url,
      headers,
      body,
      dependsOn,
    };

    // Add to current changeset or to the batch
    if (this.currentChangeset) {
      this.currentChangeset.push(request);
    } else {
      this.items.push(request);
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
   * batch.addRequest('acct', 'POST', 'accounts', undefined, { name: 'Account 1' });
   * batch.addRequest('contact', 'POST', 'contacts', undefined, {
   *   firstname: 'John',
   *   'parentcustomerid_account@odata.bind': '$acct'
   * }, ['acct']);
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

    this.items.push({ changeset: this.currentChangeset });
    this.currentChangeset = null;
    return this;
  }

  /**
   * Gets the total number of requests (including those in changesets)
   *
   * @returns Total request count
   */
  getTotalRequestCount(): number {
    let total = 0;
    for (const item of this.items) {
      total += requestsOf(item).length;
    }
    if (this.currentChangeset) {
      total += this.currentChangeset.length;
    }
    return total;
  }

  /**
   * Resolves a request URL for the batch body: `$<id>` references stay as they are, and
   * relative paths become absolute URLs under the client's Web API root.
   *
   * @param url - The URL to resolve
   * @returns The URL to write into the batch part
   */
  private resolveUrl(url: string): string {
    if (url.startsWith("$")) return url;
    return this.client.resolveUrl(url);
  }

  /** The items to send, with resolved URLs. */
  private itemsToSend(): BatchItem[] {
    const resolve = (r: BatchRequestStep): BatchRequestStep => ({
      ...r,
      url: this.resolveUrl(r.url),
    });
    return this.items.map((item) =>
      isChangeset(item) ? { changeset: item.changeset.map(resolve) } : resolve(item)
    );
  }

  /**
   * Encodes the batch body that {@link execute} sends.
   *
   * @param boundary - The batch boundary
   * @returns The `multipart/mixed` body
   */
  encode(boundary: string): string {
    return encodeBatchRequest(this.itemsToSend(), boundary);
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
    const batchBody = this.encode(boundary);

    // The caller's headers, lower-cased (client.send() would do that too), then ours: the batch
    // content type must be exactly this one, and continue-on-error is added to any Prefer.
    const headers = normalizeHeaders(options.headers);
    headers["content-type"] = `multipart/mixed; boundary=${boundary}`;
    if (options.continueOnError) {
      headers.prefer = headers.prefer
        ? `${headers.prefer}, odata.continue-on-error`
        : "odata.continue-on-error";
    }

    // client.send() returns the raw Response and sends a string body unchanged.
    const response = await this.client.send({
      method: "POST",
      url: "$batch",
      headers,
      body: batchBody,
    });

    // Dataverse answers a batch whose first failure is a 4xx or 5xx with that status, but the
    // body is still the multipart batch response. Anything else is an error for the batch as a
    // whole (malformed batch, auth, throttling).
    const contentType = response.headers.get("content-type") ?? "";
    if (!/^\s*multipart\/mixed\s*;/i.test(contentType)) {
      if (!response.ok) throw await parseODataError(response);
      throw new DataverseError(
        `Unexpected $batch response: expected multipart/mixed, got "${contentType || "no content type"}"`,
        { status: response.status, headers: headersToRecord(response.headers) }
      );
    }

    const parts = decodeBatchResponse(await response.text(), contentType);
    return this.buildResult(parts);
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
   * Matches decoded responses to requests and builds the execution result.
   *
   * Dataverse answers top-level parts in request order, and without `odata.continue-on-error`
   * it stops after the first failure, so the response parts with `batchIndex` n answer the n-th
   * item. Inside a change set each response carries its Content-ID, which is the request id; a
   * failed change set is rolled back and answered only with the failing request's response.
   *
   * @param parts - Decoded response parts
   * @returns Batch execution result
   */
  private buildResult(parts: BatchResponsePart[]): BatchExecutionResult {
    const byItem = new Map<number, BatchResponsePart[]>();
    for (const part of parts) {
      const list = byItem.get(part.batchIndex) ?? [];
      list.push(part);
      byItem.set(part.batchIndex, list);
    }

    const responses = new Map<string, BatchResponseStep>();
    let answeredItems = 0;
    this.items.forEach((item, index) => {
      const answers = byItem.get(index) ?? [];
      if (answers.length > 0) answeredItems++;
      const requests = requestsOf(item);
      const ids = new Set(requests.map((r) => r.id));
      answers.forEach((part, i) => {
        // Match by Content-ID inside a change set; otherwise (or if it is missing) by position.
        const id =
          part.contentId !== undefined && ids.has(part.contentId)
            ? part.contentId
            : i < requests.length
              ? requests[i].id
              : undefined;
        if (id === undefined || responses.has(id)) return;
        responses.set(id, {
          id,
          status: part.status,
          statusText: part.statusText,
          headers: part.headers,
          body: part.body,
          bodyText: part.bodyText,
        });
      });
    });

    const results: BatchResponseStep[] = [];
    const errors = new Map<string, Error>();
    const errorResponses = new Map<string, BatchResponseStep>();
    const skippedRequestIds: string[] = [];
    for (const request of this.items.flatMap(requestsOf)) {
      const step = responses.get(request.id);
      if (!step) {
        skippedRequestIds.push(request.id);
        continue;
      }
      results.push(step);
      if (step.status < 200 || step.status >= 300) {
        errorResponses.set(step.id, step);
        const text = step.bodyText ?? "";
        errors.set(
          step.id,
          new Error(
            `HTTP ${String(step.status)}${step.statusText ? " " + step.statusText : ""}: ${
              text.length > 0 ? text : "No response body"
            }`
          )
        );
      }
    }

    const failedRequests = errors.size;
    const successfulRequests = results.length - failedRequests;
    const totalRequests = this.getTotalRequestCount();
    const result: BatchExecutionResult = {
      responses,
      results,
      errors,
      success: failedRequests === 0 && skippedRequestIds.length === 0,
      totalRequests,
      successfulRequests,
      failedRequests,
      skippedRequestIds,
      stoppedEarly: answeredItems < this.items.length,
    };

    // If there were errors and not continueOnError, throw
    if (failedRequests > 0) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error -- DataverseBatchError extends DataverseError extends Error; cross-package type resolution prevents ESLint from verifying the chain
      throw new DataverseBatchError(
        `Batch request failed with ${String(failedRequests)} error(s) out of ${String(totalRequests)} request(s)`,
        errorResponses,
        totalRequests,
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
    this.items = [];
    this.currentChangeset = null;
    this.requestIdSet.clear();
    return this;
  }
}
