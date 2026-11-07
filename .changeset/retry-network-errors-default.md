---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Idempotent requests are retried after a dropped connection by default (#351). **Breaking.**

When `fetch` itself fails (a `DataverseNetworkError` named `ConnectionFailed`, such as a reset socket), GET, HEAD, OPTIONS, PUT, DELETE, and PATCH with `If-Match` are now retried with the same backoff and `maxRetries` as a 503. Before, the error was thrown at once unless `retry.retryNetworkErrors` was `true`.

- POST and other PATCHes still aren't retried after a network error, because the connection can drop after Dataverse applied the request. `retryNonIdempotent: true` alone doesn't change that. They are retried only when `retryNetworkErrors: true` is set as well.
- `retry: { retryNetworkErrors: false }` restores the 1.x behaviour (the error is thrown at once), for the client or for one request.
- Aborts, timeouts and requests with a stream body are never retried.
- The files client's `UploadBlock` requests are resent after a dropped connection only when the client sets `retryNetworkErrors: true`, as before.
