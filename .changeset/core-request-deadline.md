---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`timeoutMs` now limits the whole request, and abort listeners no longer leak (#46).

- **A deadline for the whole request.** `timeoutMs` starts when the request is sent and covers every attempt, every retry wait (including `Retry-After`) and the wait for a concurrency slot. Before, it applied to each attempt, so a "10 s timeout" with retries could take minutes. When it passes, the request rejects with `DataverseNetworkError` (`RequestTimeout`).
- **`attemptTimeoutMs`** (new, on `RequestOptions` and `RequestInformation`) limits a single attempt. A timed-out attempt is not retried.
- **Waiting for a slot can be cancelled.** A request queued for a concurrency slot now leaves the queue when its signal aborts or its deadline passes. An already-aborted request no longer reaches `fetch`.
- **No listener leaks.** Signals are combined with `AbortSignal.any()` where it exists, and otherwise detached when the attempt ends. Retry waits remove their abort listener when they finish. A long-lived signal shared by many requests no longer gains a listener per request.
