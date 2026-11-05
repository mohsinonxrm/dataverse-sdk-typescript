---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Retries can be observed (#32). New `retry.onRetry(info)` (client or per request) runs once before each retry with the attempt number, `maxRetries`, the status (0 for a network error), the delay, `retryAfterMs`, the correlation id and the request, so a UI can show "Throttled, retrying in 12 s (2/6)". An error thrown by the hook is logged and ignored. New `getRetryAttempts(res)` returns the attempt history behind a response from `send()` or `response()`.
