---
"@mohsinonxrm/dataverse-sdk-core": minor
---

A caller's `AbortSignal.timeout()` now rejects with an SDK error (#282).

- **Reported like `timeoutMs`.** When the `signal` you pass times out, the request rejects with `DataverseNetworkError` named `RequestTimeout`, the same error as the client's own `timeoutMs` deadline. It carries the request's `correlationId`, and the signal's `TimeoutError` is its `cause`. Before, the `TimeoutError` from `fetch` came through as a raw `DOMException`, and a timeout during a retry wait or the wait for a concurrency slot was reported as `DataverseAbortError`.
- **Every wait.** Retry waits and the wait for a concurrency slot now reject with the signal's `TimeoutError`, as `fetch` does. A fetch provider that rejects with a plain `AbortError` is recognised by the signal's reason.
- `DataverseNetworkError.timeout(timeoutMs?, cause?)`: both arguments are optional. Without `timeoutMs` the message is `"Request timed out"`.
- A plain `abort()` is still a `DataverseAbortError`.
