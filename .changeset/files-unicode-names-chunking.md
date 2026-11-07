---
"@mohsinonxrm/dataverse-sdk-files": patch
---

File names outside ASCII, and files that can't be downloaded in parts (#362).

- **Any file name uploads.** The `"single"` and `"patch-chunked"` routes send the name as the percent-encoded `?x-ms-file-name=` query parameter instead of the `x-ms-file-name` header. A header carries only ASCII: `fetch` threw a `TypeError` on a name like `合同.pdf`, and a name like `résumé.pdf` was stored garbled. The `"actions"` route already sent the name in its JSON body.
- **`IsChunkingSupported: false` is honoured.** For a file Dataverse can't read in parts (on-premises, or an environment with a self-managed key), the `"actions"` download reads the whole file as one `DownloadBlock`, and the `"range"` download (the `downloadStream()` default) falls back to one `GET` when a `Range` request fails with `0x80090017`. Both used to fail.
