---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Entity-typed action and message parameters take an entity payload, and optional parameters can be left out (#74).

- `Merge`'s `UpdateContent` and other `crmbaseentity` parameters are `EntityReference | AnyEntityPayload`, an object whose `@odata.type` names the table and whose other properties are column values. They were typed `EntityReference`.
- A parameter of one table, such as `WinOpportunity`'s `OpportunityClose`, is `EntityReference | EntityPayload<opportunityclose>`: its columns, `@odata.type`, and lookups set with `<navigation property>@odata.bind`. It was the read shape, which has `_opportunityid_value` but no way to bind a lookup. A collection of a table is `(EntityReference | EntityPayload<table>)[]`. `EntityPayload` and `AnyEntityPayload` are exported from both packages.
- A parameter that `$metadata` doesn't mark `Nullable="false"` is optional, as it is for functions (#68): it can be left out, for example `new ExecuteWorkflowAction(workflowId, { EntityId })`, and isn't sent when it's `undefined`.
- **messages: `createEntityReference` sends the Web API shape.** It sent `{ "@odata.type", id, logicalName }`, which Dataverse rejects in any entity parameter ("The property 'id' does not exist on type 'Microsoft.Dynamics.CRM.account'"). It now sends `@odata.type` and the table's primary key from the CSDL, as the actions package does. `id`, `logicalName` and `name` are kept but not enumerable. Since #295 there is one `createEntityReference` for the whole SDK, and its third argument is `EntityReferenceOptions` (`primaryIdAttribute`, `entitySetName` for a table the CSDL doesn't know, and `name` for the display name). A hand-written `{ "@odata.type", id }` literal no longer type-checks as an `EntityReference`; use `createEntityReference`.
