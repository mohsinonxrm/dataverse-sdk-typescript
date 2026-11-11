---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

`upsertMultiple()` and `deleteMultiple()` bulk helpers (#434), alongside `createMultiple()` / `updateMultiple()`, with the same options (`strategy`, `batchSize`, `maxParallel`, `continueOnError`, `headers`, `signal`, `timeoutMs`, `attemptTimeoutMs`, `correlationId`), per-record results (`BulkOperationResult`) and errors (`DataverseBulkOperationError`).

- **`upsertMultiple(client, table, records, options?)`**: each record names its row by primary key or by `@odata.id` (`accounts(<id>)`, or an alternate key such as `accounts(accountnumber='A-1')`). `"bulk"` sends `UpsertMultiple`; `"batch"` sends one `PATCH <set>(<key>)` per record without `If-Match` (an upsert) in `$batch`; `"auto"` picks `"bulk"` when the table supports both `CreateMultiple` and `UpdateMultiple`. A record that names no row, or two records that name the same row (which `UpsertMultiple` rejects), throw `DataverseInvalidRequestError` before anything is sent.
- **`deleteMultiple(client, table, records, options?)`**: records are ids, or objects with the primary key (and `partitionid` on an elastic table). Dataverse has `DeleteMultiple` for elastic tables only, so the default strategy is `"auto"`: `DeleteMultiple` for an elastic table, `$batch` `DELETE`s otherwise. `"bulk"` on a standard table throws `DataverseInvalidRequestError` before anything is deleted. A row that doesn't exist is a failed record (404), not a thrown error.
