/**
 * Names of the events the SDK sends to `TelemetryClient.trackEvent`. Every event carries the
 * request's `correlation.id` property; the other properties (strings) and measurements (numbers)
 * are listed per event. URLs are redacted with the client's `redactUrl`.
 */
export const TelemetryEvents = {
  /**
   * A response with status 429 (service protection limit), once per throttled attempt.
   * Properties: `request.method`, `request.url`, and when the JSON error body says which limit was
   * hit, `throttle.limit` (`requests`, `execution_time` or `concurrent_requests`) and `error.code`.
   * Measurements: `retry.attempt` (0 for the first attempt), `retry.after_ms` (from
   * `Retry-After`), `dop_hint` (from `x-ms-dop-hint`).
   */
  throttle: "dataverse.throttle",
  /**
   * The SDK is about to wait and retry a request (the same moment `retry.onRetry` runs).
   * Properties: `request.method`, `request.url`, `retry.reason` (`status` or `network_error`),
   * `error.type` for a network error. Measurements: `retry.attempt` (1 for the first retry),
   * `retry.max`, `retry.delay_ms`, `retry.after_ms` (when the response had `Retry-After`),
   * `status` (0 for a network error).
   */
  retry: "dataverse.retry",
  /**
   * A request had to wait for a concurrency slot (`concurrency.maxConcurrentRequests`), sent once
   * it got one. Properties: `request.method`, `request.url`. Measurements: `wait_ms`,
   * `concurrency.limit`, `concurrency.queued` (requests waiting, this one included, when it
   * started to wait).
   */
  concurrencyWait: "dataverse.concurrency.wait",
  /**
   * The concurrency limit changed because of an `x-ms-dop-hint` response header. Measurements:
   * `concurrency.limit`, `concurrency.previous_limit`, `dop_hint`.
   */
  concurrencyLimit: "dataverse.concurrency.limit",
  /**
   * One `$batch` request came back (`@mohsinonxrm/dataverse-sdk-batch`; an execution larger than
   * `batchSize` sends several). Properties: `batch.continue_on_error` (`true` or `false`).
   * Measurements: `batch.requests`, `batch.succeeded`, `batch.failed`, `duration_ms`, `status`.
   * `batch.succeeded` and `batch.failed` are absent when the batch failed as a whole.
   */
  batch: "dataverse.batch",
} as const;
