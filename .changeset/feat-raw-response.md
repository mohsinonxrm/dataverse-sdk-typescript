---
"@mohsinonxrm/dataverse-sdk-core": minor
---

The fluent builder can now read any response, not only JSON (#11).

- `get()`, `post()`, `patch()`, `put()` and `delete()` resolve `undefined` for `204 No Content` or an empty body; before, `get()` threw `SyntaxError: Unexpected end of JSON input`. A non-JSON body rejects with `DataverseInvalidRequestError` (`name: "UnexpectedContentType"`), which points at the new methods below.
- New terminals: `text()`, `blob()` and `arrayBuffer()` for `$metadata`, `$value` and other non-JSON content.
- New `response(method?, body?, options?)` returns the raw `Response` (status, `ETag`, `OData-EntityId`, `Preference-Applied`, `x-ms-service-request-id`) and doesn't reject on non-2xx.
- New `createAndGetId(body)` returns the new record's id from `OData-EntityId`, without needing `Prefer: return=representation`.
- New export: `entityIdFromResponse(res)`.
