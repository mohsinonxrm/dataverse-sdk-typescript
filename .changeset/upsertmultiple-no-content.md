---
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
"@mohsinonxrm/dataverse-sdk-generator": patch
---

**Breaking.** `UpsertMultiple` resolves `null` for Dataverse's `204 No Content` instead of throwing "Unexpected end of JSON input" after the records were written. `$metadata` declares a `mscrm.UpsertMultipleResponse` return, but ["the `UpsertMultiple` action returns `204 NoContent`"](https://learn.microsoft.com/power-apps/developer/data-platform/bulk-operations#examples).

- `UpsertMultipleResponse` (actions) and `UpsertMultipleResult` (messages) are now `{ "@odata.context"?, Results } | null` types instead of interfaces. `client.execute(new UpsertMultipleAction(...))` resolves `null`, and `UpsertMultipleRequest`'s `result` is `null`; a body is still read if Dataverse ever sends one.
- dataverse-gen does the same: an operation Dataverse answers with a 204 although `$metadata` declares a primitive or complex return (today `UpsertMultiple`) has a `<Class>Response` of `<Type> | null`, and resolves `null` for the 204.
