---
"@mohsinonxrm/dataverse-sdk-core": patch
---

Two retry fixes (#469, #471).

- **`shouldRetry` no longer turns off the idempotency guard (#469).** `retry.shouldRetry` now only picks which statuses (and network errors) are worth retrying. A POST, or a PATCH without `If-Match`, is still not replayed after a 5xx or a dropped connection, and a `$batch` POST whose 429 response has per-request results is still handed back, unless `retryNonIdempotent: true`. Before, any `shouldRetry` skipped those checks, so `shouldRetry: (s) => s >= 500` could create a record twice when a gateway answered 502 after Dataverse applied the create. **Behaviour change:** if you relied on `shouldRetry` to replay creates or actions, add `retryNonIdempotent: true`.
- **A `Retry-After` past the deadline fails at once (#471).** With `timeoutMs`, a retry whose wait (`Retry-After` or the computed backoff) would end after the deadline is no longer started. The response comes back at once: a 429 rejects with `DataverseThrottleError` and its `retryAfterMs`, and a 502/503/504 rejects with its own error (`send()` returns the response). A network error is thrown as `ConnectionFailed`. Before, the SDK slept until the deadline and rejected with `DataverseNetworkError` named `RequestTimeout`, so in this case the error type changes. `onRetry` and the `dataverse.retry` telemetry event fire only for retries that happen. `MiddlewareContext` has a new optional `deadline` (ms since the epoch) for custom middleware.
