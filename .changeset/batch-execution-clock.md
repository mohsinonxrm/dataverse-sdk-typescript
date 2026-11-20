---
"@mohsinonxrm/dataverse-sdk-batch": patch
---

An execution's `timeoutMs` (`BatchRequestBuilder.execute()`, `createMultiple()`, `updateMultiple()`, `upsertMultiple()`, `deleteMultiple()`) is timed on the client's clock (`DataverseClientOptions.clock`), like core's own `timeoutMs` (#547). With a fake clock (`fakeClock()` from the testing package), advancing it now times the execution out, and the deadline sent to the retry middleware is on the same clock as its waits. With the default clock nothing changes.
