---
"@mohsinonxrm/dataverse-sdk-core": minor
---

A client clock for retry waits and deadlines; `waitForAsyncOperation()` reads get the deadline.

- `DataverseClientOptions.clock?: Clock` (default `systemClock`) times the `timeoutMs` deadline and the retry middleware's waits (`Retry-After` and backoff) and deadline checks. It is on the middleware context as `ctx.clock` and on the client as `client.clock`. `CircuitBreakerMiddleware`, `AdaptiveThrottlingMiddleware` and `ChaosMiddleware` use it when their own `clock` option (or the breaker's `now`) isn't set; their options still win. A fake clock tests retries and timeouts without waiting. `attemptTimeoutMs` stays on real time.
- `RequestOptions.deadline` (ms since the epoch, on the client's clock), on the builder terminals and `client.execute()`, like `RequestInformation.deadline`: a time limit you enforce through `signal`, so a retry wait that would end after it isn't started.
- `waitForAsyncOperation({ timeoutMs })` gives each read the wait's deadline: a read answered 429 with a `Retry-After` longer than the time left rejects at once with `DataverseThrottleError` instead of `DataverseAsyncOperationError` (`reason: "timeout"`) when the time runs out. Its waits between reads and its `timeoutMs` use the client's clock.
- Testing package (private, not published): tests of the client clock with `fakeClock()`.
