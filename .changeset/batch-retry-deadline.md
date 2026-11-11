---
"@mohsinonxrm/dataverse-sdk-core": patch
"@mohsinonxrm/dataverse-sdk-batch": patch
---

`execute({ timeoutMs })` gives the retry middleware its deadline (#487).

- **batch:** `BatchRequestBuilder.execute({ timeoutMs })`, and `createMultiple()` / `updateMultiple()` with `timeoutMs` (every `CreateMultiple`/`UpdateMultiple` request, the `$batch` of `strategy: "batch"` and the `strategy: "auto"` support lookup), now send the execution's deadline with each request. A retry whose wait (`Retry-After` or backoff) would end after it isn't started, as for a single request's `timeoutMs` since 2.0.1: a 429 with a long `Retry-After` rejects at once with `DataverseThrottleError` (wrapped in `DataverseBatchError` once an earlier `$batch` of a split batch has run) instead of `DataverseNetworkError` (`RequestTimeout`) when `timeoutMs` passes. A later `$batch` gets only the time left.
- **core:** `RequestInformation` has a new optional `deadline` (ms since the epoch) for callers that enforce their own time limit through `signal`. It doesn't abort anything; `client.send()` puts it, or the request's `timeoutMs` deadline if earlier, on `MiddlewareContext.deadline`.
