/**
 * @fileoverview Core types and interfaces for batch operations
 */

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
   * HTTP method for the request
   */
  method: string;

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
   * Request body. Strings are sent unchanged; anything else is JSON-encoded. Either way the part
   * gets `Content-Type: application/json; type=entry` unless `headers` sets a content type.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;

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
 */
export interface BatchResponsePart {
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
   * the text. `undefined` when the body is empty.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;

  /**
   * The body exactly as received (empty string when there is none)
   */
  bodyText: string;
}

/**
 * Represents a parsed response from a batch operation
 */
export interface BatchResponseStep {
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
   * Parsed response body (JSON when the part is JSON, otherwise text)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;

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
