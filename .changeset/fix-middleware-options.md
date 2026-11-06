---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Per-request middleware options now reach the middleware (#16). `RequestOptions.middlewareOptions` was declared, and `RetryMiddleware` read `ctx.middlewareOptions`, but nothing ever passed the option through, so every per-request override was ignored. Pass `middlewareOptions: new MiddlewareRequestOptions([...])` to builder terminals or `execute()`, or set it on the `RequestInformation` given to `send()`:

- `{ type: "retry", maxRetries, baseDelayMs, retryableStatusCodes }` overrides the client's retry settings for that request. Fields you leave out keep the client's value.
- `{ type: "concurrency", bypass: true }` skips the concurrency queue.
- `{ type: "telemetry", disable: true }` sends no diagnostic headers and tracks nothing; `customProperties` are added to the tracked dependency.
- `{ type: "logging", disable: true }` (or a `logLevel` above `debug`) keeps the request out of the logger.
