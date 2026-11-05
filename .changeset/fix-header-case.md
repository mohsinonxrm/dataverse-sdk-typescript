---
"@mohsinonxrm/dataverse-sdk-core": patch
---

Fix duplicated request headers (#9). Header names are now lower-cased once, when `DataverseClient.send()` is called, and in `execute()` option merging. A caller's `Content-Type`, `Accept`, `Prefer` or `Authorization` therefore replaces the SDK's default instead of being sent next to it. Before, `fetch` combined the two casings into one value, for example `Content-Type: application/json, application/json; charset=utf-8`, and **Dataverse rejected those requests with HTTP 400 `0x80048d19`**. That included every generated action call. `send()` also no longer mutates the caller's `RequestInformation`. New export: `normalizeHeaders()`.
