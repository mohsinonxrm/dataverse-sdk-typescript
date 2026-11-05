---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Retry controls now work as documented (#17).

- **`Retry-After` is capped.** New `retry.maxRetryAfterMs` (default: `maxDelayMs`, 30 s). When the server asks for a longer wait, the response is returned at once instead of sleeping (a 429 throws `DataverseThrottleError` with `retryAfterMs`), so the caller decides whether to wait. Set `Infinity` to keep the old behaviour. A `Retry-After` within the cap is waited out exactly, without jitter.
- **Jitter is applied** (±20%) to the computed backoff whenever `jitter` is true (the default). Before, it needed `useExponentialBackoff`, which the client options could not set.
- **One `RetryOptions` type** for the client and per request: `maxRetries`, `baseDelayMs`, `maxDelayMs`, `maxRetryAfterMs`, `jitter`, `retryableStatusCodes`, `retryNonIdempotent`, `retryNetworkErrors`, `shouldRetry`. `MiddlewareRetryOptions` is now an alias of it. The per-request `delay` still works as a deprecated alias of `baseDelayMs`; `useExponentialBackoff` is deprecated and has no effect.
- **One `Retry-After` parser** (`parseRetryAfter`), used by the retry middleware and by the error parser: delta-seconds including decimals (`"1.5"` is 1500 ms) and HTTP-dates. Values like `"-5"` or `"12abc"` are now ignored instead of being read as numbers.
- **Network errors:** when `fetch` rejects with a `TypeError` (DNS, TLS, dropped connection, CORS), the SDK now throws `DataverseNetworkError` named `ConnectionFailed`, with the original error as `cause`. With the new `retry.retryNetworkErrors: true`, idempotent requests are retried with backoff. Aborts and timeouts are never retried.
