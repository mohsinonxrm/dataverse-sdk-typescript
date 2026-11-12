/**
 * @fileoverview Core types and interfaces for batch operations
 */

import type { HttpMethod } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * The HTTP method of a request in a batch: core's `HttpMethod`, in upper or lower case (it is sent
 * upper-cased).
 */
export type BatchMethod = HttpMethod | Lowercase<HttpMethod>;

/**
 * Represents a single request in a batch
 */
export interface BatchRequestStep {
  /**
   * Unique identifier for this request within the batch.
   * Inside a change set it is sent as the part's `Content-ID`, so a later request in the same
   * change set can refer to the entity this one creates as `$<id>`.
   */
  id: string;

  /**
   * HTTP method for the request. `BatchRequestBuilder` stores it upper-cased.
   */
  method: BatchMethod;

  /**
   * Request URL: an absolute URL, a path relative to the Web API root (`accounts`), or a
   * `$<id>` reference to an earlier request in the same change set. The encoder writes it
   * unchanged; `BatchRequestBuilder` resolves relative paths to absolute URLs.
   */
  url: string;

  /**
   * Request headers
   */
  headers?: Record<string, string>;

  /**
   * Request body. Strings are sent unchanged; anything else is JSON-encoded (`null` and
   * `undefined` send no body). Either way the part gets `Content-Type: application/json;
   * type=entry` unless `headers` sets a content type.
   */
  body?: unknown;

  /**
   * Ids of earlier requests in the same change set that this request refers to with `$<id>`.
   * Checked when the request is added; it does not change what is sent.
   */
  dependsOn?: string[];
}

/**
 * A change set: requests that Dataverse runs as one transaction.
 */
export interface BatchChangeset {
  changeset: BatchRequestStep[];
}

/**
 * One top-level item of a batch, in the order it is sent: a request or a change set.
 */
export type BatchItem = BatchRequestStep | BatchChangeset;

/**
 * One operation's response, as decoded from a `multipart/mixed` batch response.
 *
 * @typeParam TBody - The type of `body`. The decoder can't know it, so it is `unknown` unless you
 *   name it: `parts[0] as BatchResponsePart<WhoAmIResponse>`.
 */
export interface BatchResponsePart<TBody = unknown> {
  /**
   * The part's `Content-ID`. Dataverse returns it only for parts inside a change set.
   */
  contentId?: string;

  /**
   * Position (0-based) of the top-level batch part this response belongs to. The parts of one
   * change set share it. Dataverse answers top-level parts in request order, so this is also the
   * position of the request or change set in the batch that was sent.
   */
  batchIndex: number;

  /**
   * True when the response came from inside a change set.
   */
  inChangeset: boolean;

  /**
   * HTTP status code
   */
  status: number;

  /**
   * HTTP status text (may be empty)
   */
  statusText: string;

  /**
   * Response headers, with lower-cased names
   */
  headers: Record<string, string>;

  /**
   * The body: parsed JSON when the part's content type is JSON and the text parses, otherwise
   * the text. `undefined` when the body is empty. It is `unknown` by default: check it, or name
   * its type with `TBody`.
   */
  body?: TBody;

  /**
   * The body exactly as received (empty string when there is none)
   */
  bodyText: string;
}

/**
 * Represents a parsed response from a batch operation
 *
 * @typeParam TBody - The type of `body`. A batch mixes responses (and a failed request's body is
 *   an OData error), so `execute()` returns `unknown` bodies; name the type for the response you
 *   know: `result.responses.get("who") as BatchResponseStep<WhoAmIResponse> | undefined`.
 */
export interface BatchResponseStep<TBody = unknown> {
  /**
   * Id of the request this response answers (the id passed to `addRequest`)
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
   * Response headers, with lower-cased names
   */
  headers: Record<string, string>;

  /**
   * Parsed response body: parsed JSON when the part is JSON, otherwise the text; `undefined` when
   * the body is empty. It is `unknown` by default: check it, or name its type with `TBody`.
   */
  body?: TBody;

  /**
   * The body exactly as received
   */
  bodyText?: string;
}

/**
 * Options for batch execution
 */
export interface BatchExecutionOptions {
  /**
   * Run every request even when one fails (sends `Prefer: odata.continue-on-error`), and return
   * the result instead of throwing for failed requests.
   * @default false
   */
  continueOnError?: boolean;

  /**
   * Maximum requests per `$batch` (1 to 1000). Larger batches are sent as several `$batch`
   * requests, one after the other, without splitting a changeset.
   * @default 1000
   */
  batchSize?: number;

  /**
   * Additional headers to include in the batch request
   */
  headers?: Record<string, string>;

  /**
   * Cancels the execution. The `$batch` in flight is aborted and no later `$batch` of a split
   * batch is sent. `execute()` rejects with `DataverseAbortError`; once a `$batch` of a split
   * batch has run, it rejects with a `DataverseBatchError` whose `cause` is that error and
   * whose `result` holds what ran. An abort doesn't undo requests Dataverse already ran.
   */
  signal?: AbortSignal;

  /**
   * Time limit for the whole execution, in ms: every `$batch` of a split batch, with its retries
   * and waits. When it passes, `execute()` rejects with `DataverseNetworkError` (`RequestTimeout`),
   * wrapped like an abort once a `$batch` has run (see `signal`). A retry whose wait
   * (`Retry-After` or backoff) would end after it is not attempted: a 429 then throws
   * `DataverseThrottleError` with `retryAfterMs` at once.
   */
  timeoutMs?: number;

  /** Time limit for each attempt of each `$batch` request, in ms. A timed-out attempt is not retried. */
  attemptTimeoutMs?: number;

  /**
   * Correlation id sent with every `$batch` request (`x-ms-correlation-id`), so the requests of a
   * split batch can be found together. A new one is generated per `$batch` when omitted.
   */
  correlationId?: string;
}

/**
 * Result of a batch execution
 */
export interface BatchExecutionResult {
  /**
   * Responses keyed by request id (the id passed to `addRequest`)
   */
  responses: Map<string, BatchResponseStep>;

  /**
   * Every response received, in request order
   */
  results: BatchResponseStep[];

  /**
   * Failed requests, keyed by request id. Each is the typed error `client.api()` would throw for
   * the same response: `DataverseODataError` (or `DataverseThrottleError` for 429), with
   * `status`, `code`, `message`, `headers`, `body` and `requestId`.
   */
  errors: Map<string, Error>;

  /**
   * Whether every request ran and succeeded
   */
  success: boolean;

  /**
   * Total number of requests in the batch
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

  /**
   * Ids of requests that got no response, in request order: Dataverse stopped after an earlier
   * failure (no `continueOnError`), or the request was in a change set that failed and was
   * rolled back.
   */
  skippedRequestIds: string[];

  /**
   * True when Dataverse stopped before reaching every top-level request or change set, or when
   * a split batch stopped before sending every `$batch`
   */
  stoppedEarly: boolean;
}
