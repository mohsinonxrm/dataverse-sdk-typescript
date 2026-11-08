---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

`dataverse-gen` retries its metadata requests when the org is busy: `$metadata` after a 400 (an org whose schema is changing has answered 400 for a few seconds while it rebuilds the document), a 429 or a 5xx, and `RetrieveMetadataChanges` after a 429 or a 5xx, up to five tries with backoff (or `Retry-After`). A request that still fails reports the response body. A `RetrieveMetadataChanges` query Dataverse refuses (400) isn't retried.
