---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

`continueOnError` returns the result, errors carry it, and large batches are split (#57).

- **`continueOnError`.** `execute({ continueOnError: true })` no longer throws when a request fails: it returns the result, with `success: false` and the failures in `errors`. Without it, Dataverse stops at the first failure and `execute()` throws `DataverseBatchError` as before, but the error now has `result` with every response received, in order, plus `skippedRequestIds` and `stoppedEarly`. `requestErrors` still holds only the failures.
- **Typed per-request errors.** Each value in `result.errors` is the error `client.api()` would throw for the same response: `DataverseODataError` (or `DataverseThrottleError` for 429), with `status`, `code`, Dataverse's `message`, `headers`, `body` and `requestId`.
- **Auto-split.** More than `batchSize` requests (default and maximum: 1000, the Dataverse limit; it was documented as 10 but never used) are sent as several `$batch` requests, one after the other, without splitting a changeset. Without `continueOnError`, the batches after the first one with a failure are not sent. If a later batch fails as a whole, `execute()` throws `DataverseBatchError` with the earlier batches' `result` and the typed error as `cause`. A changeset over 1000 requests, or a `batchSize` outside 1 to 1000, throws. `execute()` threw "split manually" for more than 1000 requests before.
- **Docs.** The batch sections of the getting-started guide, the bulk-vs-batch guide, the supported-messages guide, the API surface, ADR-0001 and the samples list now show the real `addRequest(id, method, url, …)` signature, `beginChangeset()`, results keyed by id, `continueOnError` as a batch option, and `$<id>` references.
