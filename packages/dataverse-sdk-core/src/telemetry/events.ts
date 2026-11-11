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
   * The concurrency limit changed. Properties: `concurrency.reason`: `dop_hint` (an
   * `x-ms-dop-hint` response header), `throttle` (halved after a 429 with error `0x80072326`, too
   * many concurrent requests; see `concurrency.reduceOnThrottle`) or `recovery` (raised one step
   * after such a halving, when no hint is readable). Measurements: `concurrency.limit`,
   * `concurrency.previous_limit`, and `dop_hint` when the response had one.
   */
  concurrencyLimit: "dataverse.concurrency.limit",
  /**
   * One `$batch` request came back (`@mohsinonxrm/dataverse-sdk-batch`; an execution larger than
   * `batchSize` sends several). Properties: `batch.continue_on_error` (`true` or `false`).
   * Measurements: `batch.requests`, `batch.succeeded`, `batch.failed`, `duration_ms`, `status`.
   * `batch.succeeded` and `batch.failed` are absent when the batch failed as a whole.
   */
  batch: "dataverse.batch",
  /**
   * A `CircuitBreakerMiddleware` changed state. Properties: `circuit.state` (`closed`, `open`,
   * `half-open` or `isolated`), `circuit.previous_state`, `circuit.reason` (`failure_threshold`,
   * `failure_ratio`, `probe_failed`, `probe_succeeded`, `break_elapsed`, `isolate` or `reset`),
   * `circuit.mode` (`consecutive` or `ratio`); `correlation.id` is the request's that caused the
   * change (empty for `isolate()` and `reset()`, which report through the last request's
   * telemetry client). Measurements: `circuit.failures` (in a row, or in the sampling window in
   * ratio mode), `circuit.break_ms` (when it opens), `circuit.throughput` (ratio mode).
   */
  circuitState: "dataverse.circuit.state",
  /**
   * `ChaosMiddleware` injected a fault into an attempt (dev and test environments only). The
   * attempt's dependency, and its exception or `dataverse.throttle` event, carry
   * `chaos.injected: "true"` and `chaos.fault` too. Properties: `chaos.fault` (`status`,
   * `network`, `latency` or `hang`), `request.method`, `error.type` (`ConnectionFailed`) for a
   * network fault. Measurements: `retry.attempt`, `status` (a fake response's status),
   * `chaos.delay_ms` (a fault's `delayMs`).
   */
  chaosInjected: "dataverse.chaos.injected",
  /**
   * `AdaptiveThrottlingMiddleware` held a request back before sending it (the same moment its
   * `onDelay` runs). Properties: `request.method`, `throttle.reason` (`pressure`: a
   * service-protection budget is low; `retry-after`: a 429's pause is in force). No `request.url`:
   * use `correlation.id` to find the request. Measurements: `delay_ms`, `throttle.pressure` (0 to
   * 1).
   */
  throttleDelay: "dataverse.throttle.delay",
} as const;
