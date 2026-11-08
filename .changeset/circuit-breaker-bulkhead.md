---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Opt-in circuit breaker and bulkhead middleware (#343). Neither is in the default pipeline; add them with the `middleware` option.

- **`CircuitBreakerMiddleware`.** After `failureThreshold` (5) failures in a row (a status of 500 or more, or a `DataverseNetworkError`), it refuses requests with the new `DataverseCircuitOpenError` (`retryAfterMs`) for `breakDurationMs` (30 s), without sending them. Then it lets one probe through: success closes the circuit, failure opens it again. A 429, another 4xx, or a request its caller aborted is not a failure. `isFailure` replaces the rule. `state`, `consecutiveFailures`, `onStateChange` and `reset()` expose it for telemetry. Added with `middleware.append`, once the circuit opens, retries stop at once.
- **`BulkheadMiddleware`.** It limits requests in flight per category, on top of the client's concurrency limit: `limits` (e.g. `{ read: 8, write: 2 }`; GET and HEAD are `"read"`, the rest `"write"`), `defaultLimit`, and `categorize(request)` for your own categories (e.g. per entity set). Requests over the limit wait (abortable). Beyond `maxQueue` waiting, they are refused with the new `DataverseBulkheadRejectedError`. Per request: `{ type: "bulkhead", category }` or `{ type: "bulkhead", bypass: true }` (`BulkheadRequestOptions`).
- `CircuitBreakerOptions` and `BulkheadOptions` reuse the names of the 1.x no-op option types removed in #285, with new fields.
