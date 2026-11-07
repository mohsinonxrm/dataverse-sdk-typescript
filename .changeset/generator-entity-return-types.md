---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
---

Operations that return one entity are typed as that entity (#71).

- `ExecuteWorkflowResponse` and the other actions and functions that return a single entity are now the entity type, plus optional `@odata.context`, `@odata.etag` and `@odata.type`, or `null` when Dataverse answers 204 (#300): `(await client.execute(new ExecuteWorkflowAction(…)))?.asyncoperationid`. Before, they declared `value: asyncoperation`, but the response body is the entity itself, so `res.value.asyncoperationid` was `undefined` at runtime and the correct `res.asyncoperationid` didn't type-check.
- An operation that returns `crmbaseentity` (any table) is typed as a record of columns instead of `value: EntityReference`.
- Primitive and collection returns keep `value`.
