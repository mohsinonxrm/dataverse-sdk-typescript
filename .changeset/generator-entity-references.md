---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
---

Entity references use the Web API shape, with primary keys and entity sets from the CSDL (#72).

- `createEntityReference(logicalName, id, options?)` returns `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }` (activities use `activityid`), which is what an entity-typed action parameter needs. Before, it returned `{ "@odata.type", id, logicalName }`, which the Web API rejects with 400. `logicalName`, `id` and `entitySetName` are still on the object, but not enumerable, so they aren't sent.
- The third argument is now `{ primaryIdAttribute?, entitySetName? }` for tables the generated CSDL doesn't know. Before, it was a `name` string, which was never sent.
- Function parameters send `{"@odata.id": "<entity set>(<id>)"}` with the entity set from the CSDL (for example `accountleadscollection`), instead of a pluralization guess. A reference whose entity set can't be resolved throws `DataverseInvalidRequestError` before the request; before, it sent `{"@odata.id":"s(…)"}`. `getEntitySetNameFromReference` throws in the same case.
- New export: the `EntityReferenceOptions` type.
