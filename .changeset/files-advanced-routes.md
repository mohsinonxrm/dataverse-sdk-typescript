---
"@mohsinonxrm/dataverse-sdk-files": minor
---

Add the missing file and image column features (#95). Uploads: `method` (`"actions"` default, `"patch-chunked"` with `Content-Range`, `"single"`), a `ReadableStream` as the file (with `size`), `mimeType`, and a `Blob` is read slice by slice instead of all at once. Downloads: `method` (`"single"` default, `"range"`, `"actions"`), `chunkSize`, `onProgress`, `imageSize: "full"`, a working `timeout`, and a new `downloadStream()` returning a `ReadableStream`. `download()` and `delete()` take an `AbortSignal`. Existing calls behave as before.
