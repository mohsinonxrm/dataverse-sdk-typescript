---
"@mohsinonxrm/dataverse-sdk-xrm": minor
---

`OrganizationService` works against the real request builder (#83, #84).

- **CRUD works.** `create()`, `retrieve()`, `retrieveMultiple()` and `update()` no longer throw `TypeError`: they used the builder's terminals as if they returned a raw `Response`. `create()` now returns the id from `OData-EntityId` (via `createAndGetId()`), and `returnRepresentation` returns the record.
- **Headers are sent.** `Prefer`, `If-Match`, `MSCRMCallerID` and custom `headers` were passed where `RequestOptions` was expected, so they never reached the wire. An `update()` with `etag` was unconditional. They are now set through the builder (`prefer()`, `ifMatch()`, `impersonate()`) and `RequestOptions.headers`.
- **`update()` no longer creates records.** It sends `If-Match: *` when no `etag` is given, so a missing record rejects with 404, like the C# `Update`. Use `client.api(...).patch()` for an upsert.
- **Duplicate detection can be turned on.** New `detectDuplicates` option on `create()` and `update()` (sends `MSCRM.SuppressDuplicateDetection: false`; a duplicate rejects with `DataverseDuplicateError`). `suppressDuplicateDetection: false` does the same; `true` remains the Web API default.
- **All expands apply.** A list of expand options becomes one `$expand` (`nav($select=…;$filter=…;$orderby=…;$top=…),…`); before, each one replaced the previous and the options were serialised as `[object Object]`. `ExpandOption` is now exported.
- **`associate()` sends an absolute `@odata.id`**, which Dataverse requires.
- `create()` has overloads: it returns `Promise<string>` without `returnRepresentation`, and `Promise<T>` with `returnRepresentation: true`.
- The README, getting-started and usage-pattern docs show the real signatures.
