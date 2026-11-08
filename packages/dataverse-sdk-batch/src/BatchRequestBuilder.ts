/**
 * @fileoverview Main BatchRequestBuilder class for creating and executing batch requests
 */

import type { DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import {
  DataverseAbortError,
  DataverseError,
  DataverseInvalidRequestError,
  DataverseNetworkError,
  generateUUID,
  normalizeHeaders,
  parseODataError,
  TelemetryEvents,
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

/** The id a `$<id>` URL refers to, e.g. `acct` in `$acct/contact_customer_accounts`. */
const CONTENT_ID_REFERENCE = /^\$([A-Za-z0-9._~-]+)(?:[/?]|$)/;

/** An HTTP token (RFC 9110): what a method or a header name may contain. */
const HTTP_TOKEN = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

/** Characters that would end a line of the multipart body (CR, LF) or that fetch rejects (NUL). */
const LINE_BREAK = /[\r\n\0]/;

/**
 * Checks that a part can be written into the multipart body as it is: the method and header
 * names are HTTP tokens, and the URL and header values contain no line breaks, which would add
 * lines (headers, or a whole request) to the batch body.
 */
function validatePart(
  id: string,
  method: string,
  url: string,
  headers: Record<string, string> | undefined
): void {
  if (!HTTP_TOKEN.test(method)) {
    throw new DataverseInvalidRequestError(
      `Request "${id}" has an invalid method: ${JSON.stringify(method)}.`
    );
  }
  if (LINE_BREAK.test(url)) {
    throw new DataverseInvalidRequestError(
      `Request "${id}" has a URL with a line break (CR, LF or NUL), which would add lines to the batch body.`
    );
  }
  for (const [name, value] of Object.entries(headers ?? {})) {
    if (!HTTP_TOKEN.test(name)) {
      throw new DataverseInvalidRequestError(
        `Request "${id}" has an invalid header name: ${JSON.stringify(name)}.`
      );
    }
    if (LINE_BREAK.test(value)) {
      throw new DataverseInvalidRequestError(
        `Request "${id}" has a line break (CR, LF or NUL) in the value of the "${name}" header, which would add lines to the batch body.`
      );
    }
  }
}

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
 * // Execute. Bodies are `unknown`: name the type of the one you read.
 * const result = await batch.execute();
 * const who = result.responses.get('who') as BatchResponseStep<{ UserId: string }> | undefined;
 * who?.body?.UserId;
 * ```
 */
export class BatchRequestBuilder {
  private client: DataverseClient;
  /** Requests and change sets, in the order they were added. */
  private items: BatchItem[] = [];
  private currentChangeset: BatchRequestStep[] | null = null;
  private requestIdSet = new Set<string>();

  /**
   * Maximum requests allowed by Dataverse per batch, and the default `batchSize`
   */
  private static readonly MAX_BATCH_SIZE = 1000;

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
   * @param body - Optional request body. Strings are sent as they are; anything else is
   *   JSON-encoded (`null` and `undefined` send no body). Either way the part gets `Content-Type: application/json; type=entry` unless `headers`
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
    body?: unknown,
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

    validatePart(id, method, url, headers);

    const earlier = new Set((this.currentChangeset ?? []).map((r) => r.id));
    if (url.startsWith("$")) {
      if (!this.currentChangeset) {
        throw new DataverseInvalidRequestError(
          `Request "${id}" has the URL "${url}", a $<id> reference, but it isn't in a changeset. A $<id> reference only works inside the changeset of the request it refers to. For a path that starts with "$", such as "$metadata", write it with a leading "/".`
        );
      }
      const ref = CONTENT_ID_REFERENCE.exec(url)?.[1];
      if (ref === undefined || !earlier.has(ref)) {
        throw new DataverseInvalidRequestError(
          `Request "${id}" has the URL "${url}", which doesn't refer to an earlier request in the same changeset. A $<id> reference only works inside one changeset.`
        );
      }
    }

    if (this.currentChangeset && method.toUpperCase() === "GET") {
      throw new DataverseInvalidRequestError(
        `Request "${id}" is a GET inside a changeset. Dataverse doesn't allow GET requests in a changeset: add it outside the changeset.`
      );
    }

    if (dependsOn?.length) {
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
  private resolveItems(items: BatchItem[]): BatchItem[] {
    const resolve = (r: BatchRequestStep): BatchRequestStep => ({
      ...r,
      url: this.resolveUrl(r.url),
    });
    return items.map((item) =>
      isChangeset(item) ? { changeset: item.changeset.map(resolve) } : resolve(item)
    );
  }

  /**
   * Encodes the batch body that {@link execute} sends (when it fits in one batch).
   *
   * @param boundary - The batch boundary
   * @returns The `multipart/mixed` body
   */
  encode(boundary: string): string {
    return encodeBatchRequest(this.resolveItems(this.items), boundary);
  }

  /**
   * Executes the batch.
   *
   * Without `continueOnError`, Dataverse stops at the first failed request, and `execute()`
   * throws a {@link DataverseBatchError} whose `result` holds every response received. With
   * `continueOnError`, Dataverse runs every request and `execute()` returns the result, whatever
   * failed: check `result.success` and `result.errors`.
   *
   * More than `batchSize` requests (default and maximum: 1000, the Dataverse limit) are sent as
   * several `$batch` requests, one after the other. A changeset is never split. Without
   * `continueOnError`, the batches after one with a failure are not sent.
   *
   * `signal` and `timeoutMs` stop the execution: the batch in flight is aborted and no later
   * batch is sent. `timeoutMs` covers the whole execution, every batch included.
   *
   * @param options - Execution options
   * @returns Batch execution result
   * @throws DataverseBatchError when a request fails and `continueOnError` is not set; or when a
   *   later batch of a split one fails as a whole, is aborted or times out (its typed error is the
   *   `cause`, and `result` holds what ran)
   * @throws DataverseODataError or DataverseThrottleError when a single (or the first) batch
   *   fails as a whole
   * @throws DataverseAbortError, or DataverseNetworkError (`RequestTimeout`), when the execution
   *   is aborted or times out before or during the first batch
   *
   * @example
   * ```typescript
   * // Execute with continue-on-error
   * const result = await batch.execute({ continueOnError: true });
   *
   * // Check results
   * if (!result.success) {
   *   for (const [id, error] of result.errors) {
   *     console.error(`Request ${id} failed:`, error.message);
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

    if (this.getTotalRequestCount() === 0) {
      throw new DataverseInvalidRequestError(
        "Cannot execute empty batch. Add at least one request."
      );
    }

    const batchSize = options.batchSize ?? BatchRequestBuilder.MAX_BATCH_SIZE;
    if (
      !Number.isInteger(batchSize) ||
      batchSize < 1 ||
      batchSize > BatchRequestBuilder.MAX_BATCH_SIZE
    ) {
      throw new DataverseInvalidRequestError(
        `batchSize must be an integer from 1 to ${String(BatchRequestBuilder.MAX_BATCH_SIZE)}, got ${String(batchSize)}.`
      );
    }

    const chunks = this.split(batchSize);
    const execution = executionSignal(options.signal, options.timeoutMs);
    try {
      return await this.executeChunks(chunks, options, execution);
    } finally {
      execution.dispose();
    }
  }

  /** Sends the batches one after the other, stopping when the execution is aborted. */
  private async executeChunks(
    chunks: BatchItem[][],
    options: BatchExecutionOptions,
    execution: ExecutionSignal
  ): Promise<BatchExecutionResult> {
    const results: BatchExecutionResult[] = [];
    for (const [index, chunk] of chunks.entries()) {
      let chunkResult: BatchExecutionResult;
      // An abort or timeout between two batches stops before the next one is sent.
      const stopped = execution.signal?.aborted ?? false;
      try {
        if (stopped) throw stopError(execution, options.timeoutMs);
        chunkResult = await this.executeSingleBatch(chunk, options, execution.signal);
      } catch (caught) {
        const err = fromStop(caught, execution, options.timeoutMs);
        if (index === 0) throw err;
        // Earlier batches have run: keep their results on the error.
        const result = this.mergeResults(results, chunks.slice(index));
        const what = stopped
          ? `Stopped before batch ${String(index + 1)} of ${String(chunks.length)}`
          : `Batch ${String(index + 1)} of ${String(chunks.length)} failed as a whole`;
        throw batchError(
          `${what} after ${String(index)} ran: ${err instanceof Error ? err.message : String(err)}`,
          result,
          err
        );
      }
      results.push(chunkResult);
      // Without continue-on-error, stop after the first batch that had a failure.
      if (!options.continueOnError && chunkResult.failedRequests > 0) break;
    }

    const result = this.mergeResults(results, chunks.slice(results.length));
    if (result.failedRequests > 0 && !options.continueOnError) {
      throw batchError(
        `Batch request failed with ${String(result.failedRequests)} error(s) out of ${String(result.totalRequests)} request(s)`,
        result
      );
    }
    return result;
  }

  /**
   * Splits the items into batches of at most `batchSize` requests, in order, keeping each
   * changeset whole.
   */
  private split(batchSize: number): BatchItem[][] {
    const chunks: BatchItem[][] = [];
    let current: BatchItem[] = [];
    let count = 0;
    for (const item of this.items) {
      const size = requestsOf(item).length;
      if (size > BatchRequestBuilder.MAX_BATCH_SIZE) {
        throw new DataverseInvalidRequestError(
          `A changeset has ${String(size)} requests; Dataverse allows at most ${String(BatchRequestBuilder.MAX_BATCH_SIZE)} per batch, and a changeset can't be split.`
        );
      }
      if (count + size > batchSize && current.length > 0) {
        chunks.push(current);
        current = [];
        count = 0;
      }
      current.push(item);
      count += size;
    }
    if (current.length > 0) chunks.push(current);
    return chunks;
  }

  /**
   * Sends one `$batch` and matches its responses to the requests.
   *
   * @param items - The requests and changesets of this batch
   * @param options - Execution options
   * @returns The result for these items (never throws for per-request failures)
   */
  private async executeSingleBatch(
    items: BatchItem[],
    options: BatchExecutionOptions,
    signal: AbortSignal | undefined
  ): Promise<BatchExecutionResult> {
    const boundary = generateBoundary();
    const batchBody = encodeBatchRequest(this.resolveItems(items), boundary);

    // The caller's headers, lower-cased (client.send() would do that too), then ours: the batch
    // content type must be exactly this one, and continue-on-error is added to any Prefer.
    const headers = normalizeHeaders(options.headers);
    headers["content-type"] = `multipart/mixed; boundary=${boundary}`;
    if (options.continueOnError) {
      headers.prefer = headers.prefer
        ? `${headers.prefer}, odata.continue-on-error`
        : "odata.continue-on-error";
    }

    // One id per $batch, generated here when the caller gave none, so the event below has it.
    const correlationId = options.correlationId ?? generateUUID();
    const started = Date.now();
    // client.send() returns the raw Response and sends a string body unchanged.
    const response = await this.client.send({
      method: "POST",
      url: "$batch",
      headers,
      body: batchBody,
      // timeoutMs is the whole execution's: it is in `signal`, with the caller's signal.
      ...(signal ? { signal } : {}),
      ...(options.attemptTimeoutMs !== undefined
        ? { attemptTimeoutMs: options.attemptTimeoutMs }
        : {}),
      correlationId,
    });
    const track = (result?: BatchExecutionResult) => {
      this.client.trackEvent(
        TelemetryEvents.batch,
        {
          "correlation.id": correlationId,
          "batch.continue_on_error": String(options.continueOnError === true),
        },
        {
          "batch.requests": items.flatMap(requestsOf).length,
          ...(result
            ? {
                "batch.succeeded": result.successfulRequests,
                "batch.failed": result.failedRequests,
              }
            : {}),
          duration_ms: Date.now() - started,
          status: response.status,
        }
      );
    };

    // Dataverse answers a batch whose first failure is a 4xx or 5xx with that status, but the
    // body is still the multipart batch response. Anything else is an error for the batch as a
    // whole (malformed batch, auth, throttling).
    const contentType = response.headers.get("content-type") ?? "";
    if (!/^\s*multipart\/mixed\s*;/i.test(contentType)) {
      track();
      if (!response.ok) throw await parseODataError(response);
      throw new DataverseError(
        `Unexpected $batch response: expected multipart/mixed, got "${contentType || "no content type"}"`,
        { status: response.status, headers: headersToRecord(response.headers) }
      );
    }

    const parts = decodeBatchResponse(await response.text(), contentType);
    const result = await buildResult(items, parts);
    track(result);
    return result;
  }

  /**
   * Combines the results of the batches that ran; the requests of batches that didn't run are
   * reported as skipped.
   */
  private mergeResults(ran: BatchExecutionResult[], notSent: BatchItem[][]): BatchExecutionResult {
    const responses = new Map<string, BatchResponseStep>();
    const errors = new Map<string, Error>();
    const results: BatchResponseStep[] = [];
    const skippedRequestIds: string[] = [];
    let stoppedEarly = notSent.length > 0;
    for (const r of ran) {
      for (const [id, step] of r.responses) responses.set(id, step);
      for (const [id, error] of r.errors) errors.set(id, error);
      results.push(...r.results);
      skippedRequestIds.push(...r.skippedRequestIds);
      stoppedEarly ||= r.stoppedEarly;
    }
    for (const chunk of notSent) {
      for (const request of chunk.flatMap(requestsOf)) skippedRequestIds.push(request.id);
    }
    return {
      responses,
      results,
      errors,
      success: errors.size === 0 && skippedRequestIds.length === 0,
      totalRequests: this.getTotalRequestCount(),
      successfulRequests: results.length - errors.size,
      failedRequests: errors.size,
      skippedRequestIds,
      stoppedEarly,
    };
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

/**
 * Matches the decoded responses of one `$batch` to its items and builds its result.
 *
 * Dataverse answers top-level parts in request order, and without `odata.continue-on-error`
 * it stops after the first failure, so the response parts with `batchIndex` n answer the n-th
 * item. Inside a changeset each response carries its Content-ID, which is the request id; a
 * failed changeset is rolled back and answered only with the failing request's response.
 */
async function buildResult(
  items: BatchItem[],
  parts: BatchResponsePart[]
): Promise<BatchExecutionResult> {
  const byItem = new Map<number, BatchResponsePart[]>();
  for (const part of parts) {
    const list = byItem.get(part.batchIndex) ?? [];
    list.push(part);
    byItem.set(part.batchIndex, list);
  }

  const responses = new Map<string, BatchResponseStep>();
  let answeredItems = 0;
  items.forEach((item, index) => {
    const answers = byItem.get(index) ?? [];
    if (answers.length > 0) answeredItems++;
    const requests = requestsOf(item);
    const ids = new Set(requests.map((r) => r.id));
    answers.forEach((part, i) => {
      // Match by Content-ID inside a changeset; otherwise (or if it is missing) by position.
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
  const skippedRequestIds: string[] = [];
  let totalRequests = 0;
  for (const request of items.flatMap(requestsOf)) {
    totalRequests++;
    const step = responses.get(request.id);
    if (!step) {
      skippedRequestIds.push(request.id);
      continue;
    }
    results.push(step);
    if (step.status < 200 || step.status >= 300) {
      errors.set(step.id, await partError(step));
    }
  }

  return {
    responses,
    results,
    errors,
    success: errors.size === 0 && skippedRequestIds.length === 0,
    totalRequests,
    successfulRequests: results.length - errors.size,
    failedRequests: errors.size,
    skippedRequestIds,
    stoppedEarly: answeredItems < items.length,
  };
}

/**
 * The typed error for a failed batch part, as `client.api()` would throw for the same response:
 * `DataverseODataError` (or `DataverseThrottleError` for 429) with `status`, `code`, `message`,
 * `headers`, `body` and `requestId`.
 */
async function partError(step: BatchResponseStep): Promise<Error> {
  const text = step.bodyText ?? "";
  try {
    // A Response can only be built for 200-599, and 204, 205 and 304 can't have a body.
    const noBody = text === "" || step.status === 204 || step.status === 205 || step.status === 304;
    const response = new Response(noBody ? null : text, {
      status: step.status,
      headers: step.headers,
    });
    return await parseODataError(response, text);
  } catch {
    return new DataverseError(`HTTP ${String(step.status)}`, {
      status: step.status,
      headers: step.headers,
      raw: step.body,
    });
  }
}

/** The signal an execution sends its batches with: the caller's, plus the `timeoutMs` deadline. */
interface ExecutionSignal {
  signal: AbortSignal | undefined;
  /** True once `timeoutMs` has passed (as opposed to the caller aborting). */
  readonly expired: boolean;
  /** Stops the timer and detaches from the caller's signal. */
  dispose(): void;
}

/**
 * Starts the signal for one execution. `timeoutMs` covers the whole execution, every batch of a
 * split one included, so it is a deadline signal linked to the caller's rather than a per-request
 * `timeoutMs`.
 */
function executionSignal(
  caller: AbortSignal | undefined,
  timeoutMs: number | undefined
): ExecutionSignal {
  if (!timeoutMs) return { signal: caller, expired: false, dispose: () => undefined };
  const controller = new AbortController();
  let expired = false;
  const timer = setTimeout(() => {
    if (controller.signal.aborted) return;
    expired = true;
    controller.abort(
      new DOMException(`Request timed out after ${String(timeoutMs)}ms`, "TimeoutError")
    );
  }, timeoutMs);
  const onAbort = (): void => {
    controller.abort(caller?.reason);
  };
  if (caller?.aborted) onAbort();
  else caller?.addEventListener("abort", onAbort, { once: true });
  return {
    signal: controller.signal,
    get expired() {
      return expired;
    },
    dispose() {
      clearTimeout(timer);
      caller?.removeEventListener("abort", onAbort);
    },
  };
}

/**
 * The error for an execution that was stopped, as the client reports a stopped request:
 * `DataverseNetworkError` (`RequestTimeout`) when `timeoutMs` passed or the caller's signal timed
 * out (`AbortSignal.timeout()`), otherwise `DataverseAbortError`.
 */
function stopError(
  execution: ExecutionSignal,
  timeoutMs: number | undefined,
  cause?: unknown
): DataverseError {
  if (execution.expired) return DataverseNetworkError.timeout(timeoutMs, cause);
  const reason: unknown = execution.signal?.reason;
  if (reason instanceof Error && reason.name === "TimeoutError") {
    return DataverseNetworkError.timeout(undefined, cause ?? reason);
  }
  return new DataverseAbortError(undefined, cause ?? reason);
}

/**
 * The error to report for a batch that failed. The client already turns an aborted request into
 * an SDK error; an abort while the response body is read still rejects with the raw
 * `AbortError` (or `TimeoutError`), which becomes the same SDK error here.
 */
function fromStop(
  err: unknown,
  execution: ExecutionSignal,
  timeoutMs: number | undefined
): unknown {
  if (err instanceof DataverseError || !(err instanceof Error)) return err;
  if (!execution.signal?.aborted) return err;
  if (err.name !== "AbortError" && err.name !== "TimeoutError") return err;
  return stopError(execution, timeoutMs, err);
}

/** A DataverseBatchError carrying the whole result. */
function batchError(
  message: string,
  result: BatchExecutionResult,
  cause?: unknown
): DataverseBatchError {
  const failed = new Map<string, BatchResponseStep>();
  const partErrors: Array<{ index: number; status: number; error: DataverseError }> = [];
  result.results.forEach((step, index) => {
    const error = result.errors.get(step.id);
    if (!error) return;
    failed.set(step.id, step);
    if (error instanceof DataverseError) partErrors.push({ index, status: step.status, error });
  });
  return new DataverseBatchError(
    message,
    failed,
    result.totalRequests,
    result.successfulRequests,
    result.failedRequests,
    { result, partErrors, ...(cause !== undefined ? { cause } : {}) }
  );
}
