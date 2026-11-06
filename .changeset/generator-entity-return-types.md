---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
---

Operations that return one entity are typed as that entity (#71).

- `ExecuteWorkflowResponse` and the other 59 actions and 8 functions that return a single entity now extend the entity type, plus optional `@odata.context` and `@odata.etag`: `(await client.execute(new ExecuteWorkflowAction(…))).asyncoperationid`. Before, they declared `value: asyncoperation`, but the response body is the entity itself, so `res.value.asyncoperationid` was `undefined` at runtime and the correct `res.asyncoperationid` didn't type-check.
- An operation that returns `crmbaseentity` (any table) is typed as a record of columns instead of `value: EntityReference`.
- Primitive and collection returns keep `value`.
