---
"@mohsinonxrm/dataverse-sdk-core": patch
---

A `$batch` POST answered with HTTP 429 and a `multipart/mixed` body is no longer replayed (#211). A 429 is normally safe to retry, because Dataverse rejects a throttled request before doing any work. A multipart body, though, carries per-request results, so some parts may already have run, and replaying the batch would run them again. The response is handed back instead. A 429 with the usual JSON error body is still retried. `retryNonIdempotent: true` or a custom `shouldRetry` restores the old behaviour.
