---
"@mohsinonxrm/dataverse-sdk-core": minor
---

`DataverseClient.send()` now accepts URLs relative to the Web API root, such as `"WhoAmI"`, `"/accounts(…)"` or `"$batch"`; absolute `http(s)://` URLs are unchanged (#31). Before, a relative URL threw `TypeError: Invalid URL`. New public `client.resolveUrl(path)` returns the absolute URL that `send()` and the fluent builder use. `apiVersion` now accepts any `vX.Y` version (for example `"v9.1"`), not just `"v9.2"`. New type export: `ApiVersion`.
