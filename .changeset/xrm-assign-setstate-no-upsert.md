---
"@mohsinonxrm/dataverse-sdk-xrm": patch
---

`assign()` and `setState()` now send `If-Match: *`. Without it the PATCH was an upsert, so a missing id created a record (confirmed live for `assign()`) instead of failing with 404. `update()` already sent it.
