---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

Bulk helpers: `createMultiple()` and `updateMultiple()` (#310).

- **Chunks.** The records are split into chunks of `batchSize` (1 to 1000, default 100), each sent as one `CreateMultiple` / `UpdateMultiple` request (`strategy: "bulk"`, the default) or as one `$batch` with a request per record and `odata.continue-on-error` (`strategy: "batch"`, for tables without bulk support; updates are `PATCH` with `If-Match: *`, so a missing row isn't created). `maxParallel` sends several chunks at once; the client's retry policy and concurrency limit apply to every request.
- **Per-record results.** `BulkOperationResult.results` has one entry per record, in input order: `"succeeded"` with its `id` (the created id, or the updated row's key), `"failed"` with the typed `error`, or `"skipped"` (not sent: without `continueOnError`, no chunk is sent after one with a failure). On a standard table a failed chunk fails all its records (Dataverse rolls it back); on an elastic table only the records named by the `Microsoft.PowerApps.CDS.ErrorDetails.*` annotations fail, each with its own status.
- **Cancellation.** `signal`, `timeoutMs` (the whole operation), `attemptTimeoutMs` and `correlationId`, as for `execute()`. Stopped after a request finished, the helpers reject with the new `DataverseBulkOperationError`, whose `result` holds every record's outcome so far.
- New types: `BulkTable`, `BulkStrategy`, `BulkOperationOptions`, `BulkOperationResult`, `BulkRecordResult`, `BulkRecordStatus`, `DataverseBulkOperationErrorInit`.
