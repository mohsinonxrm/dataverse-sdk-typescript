---
"@mohsinonxrm/dataverse-sdk-core": minor
---

One error model (#19). There were two unrelated `DataverseError` classes, so `err instanceof DataverseError` was false for authentication, invalid-request and network errors. Now every error the SDK throws extends the exported `DataverseError`.

- **Base fields.** `DataverseError` has `status`, `code`, `message`, `headers` (lower-cased names), `body` (parsed JSON or text; also `raw`), `innerError` (`message`, `type`, `stacktrace`), `requestId`, `correlationId`, `cause` and `date`. `statusCode` is kept as a deprecated alias of `status`.
- **HTTP errors** (`DataverseODataError`, `DataverseThrottleError`) now carry the response headers, Dataverse's `innererror`, and the correlation id the SDK sent.
- **`requestId`** is read from `x-ms-service-request-id`, then `REQ_ID`, then the older `req-id` / `x-ms-request-id`.
- **Aborts.** A cancelled request, including one cancelled during a retry wait, now throws `DataverseAbortError` instead of a raw `DOMException`. Its `name` is still `"AbortError"`, and the original error is its `cause`. Network failures were already `DataverseNetworkError` (#17), and every SDK error from `send()` now carries the request's `correlationId`.
- **Cleanup.** The unused duplicate `DataverseBatchError` inside `NamedErrors` is removed (the exported one is unchanged). The README's error section uses the real property names and hierarchy.
