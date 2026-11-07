---
"@mohsinonxrm/dataverse-sdk-batch": patch
---

`execute()` can be cancelled and timed out, and `addRequest()` rejects parts that can't be sent (#379).

- **Cancellation.** `BatchExecutionOptions` has `signal`, `timeoutMs`, `attemptTimeoutMs` and `correlationId`, passed to every `$batch` request. Aborting stops the `$batch` in flight and sends no later `$batch` of a split batch. `timeoutMs` covers the whole execution, every `$batch` included. Before or during the first `$batch`, `execute()` rejects with `DataverseAbortError` (or `DataverseNetworkError` named `RequestTimeout`); after one has run, with a `DataverseBatchError` whose `cause` is that error and whose `result` holds what ran.
- **Validation.** `addRequest()` throws `DataverseInvalidRequestError`, and doesn't add the request, for a GET inside a changeset (Dataverse forbids it); a CR, LF or NUL in a header value or the URL, an invalid header name or an invalid method (they would add lines to the multipart body); and a `$<id>` URL outside a changeset or naming no earlier request of the open changeset (Content-ID references only work inside one). Write a path such as `$metadata` as `/$metadata`.
