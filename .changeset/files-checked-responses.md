---
"@mohsinonxrm/dataverse-sdk-files": minor
---

`FileColumnClient` checks every response, and `delete()` deletes the file (#61).

- **Failed steps reject.** `upload()` never checked the `InitializeFileBlocksUpload`, `UploadBlock` or `CommitFileBlocksUpload` responses, so an upload where a block or the commit failed resolved as if it had worked. Each response is now checked: a failure rejects with the parsed `DataverseODataError` (or `DataverseThrottleError` for a 429), with `status`, `code` and the response details, and nothing after the failed request is sent. `download()` rejects with the same error type instead of a plain `Error`, so a column with no file is a 404 with code `0x80040217`.
- **`delete()` works.** It sent `PATCH { column: null }`, which Dataverse answers with 204 while leaving the file in place. It now sends `DELETE /{entitySet}({id})/{column}`, and rejects if Dataverse rejects the request.
- **Cancel an upload.** `FileUploadOptions.signal` aborts the request in flight and stops the upload; it rejects with a `DataverseAbortError` when sent through a `DataverseClient`.
- **Block retry.** Through a `DataverseClient`, a block is also retried after a 502, 503 or 504, within the client's `retry.maxRetries`: sending a block again with the same id replaces it. Other POSTs are still retried only after a 429.
- **Chunk size.** Dataverse rejects blocks above 4 MB, so a larger `chunkSize` now rejects with a `DataverseInvalidRequestError` before anything is sent. The README no longer recommends 8 MB or 16 MB chunks.
