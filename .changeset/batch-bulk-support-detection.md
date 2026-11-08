---
"@mohsinonxrm/dataverse-sdk-batch": minor
---

Detect which bulk-operation messages a table supports (#346).

- **`getBulkOperationSupport(client, logicalName, options?)`** returns `BulkOperationSupport`: `elastic`, `createMultiple`, `updateMultiple`, `upsertMultiple` and `deleteMultiple`. Elastic tables support all four; a standard table supports `CreateMultiple` / `UpdateMultiple` when it has an `sdkmessagefilter` for the message, `UpsertMultiple` when it supports both, and never `DeleteMultiple`. Two read-only `GET`s (the table's `TableType` and its `sdkmessagefilters`), cached per client and table; `refresh: true` reads again, and a failed lookup isn't cached. `BulkOperationSupportOptions` also takes `signal` and `timeoutMs`.
- **`strategy: "auto"`** for `createMultiple()` and `updateMultiple()`: the bulk message when the table supports it, otherwise `$batch`. `result.strategy` says which was used.
