---
"@mohsinonxrm/dataverse-sdk-core": patch
---

`text()`, `blob()` and `arrayBuffer()` now send `Accept: */*` unless the caller set an `Accept` header (#210). They used to inherit the default `Accept: application/json`, so `client.api("$metadata").text()` failed with HTTP 415 ("A supported MIME type could not be found"). JSON terminals still send `application/json`.
