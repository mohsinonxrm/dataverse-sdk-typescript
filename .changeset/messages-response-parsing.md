---
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Message responses read their result correctly (#70).

- An entity or complex-type return is the response body itself (with its `@odata.*` annotations since #300). Before, every response read `body.value`, so `result` was `undefined` for 962 of the 1356 messages, including `QueryExpressionToFetchXmlResponse` (`result.FetchXml`), `ExecuteWorkflowResponse` (`result.asyncoperationid`) and `ExportSolutionResponse` (`result.ExportSolutionFile`). Primitive and collection returns are still read from `value`.
- `result` no longer references its own response class. Its type is exported as `<Name>Result`, for example `QueryExpressionToFetchXmlResult` (#300). A `crmbaseentity` return is typed as a record of columns, or an array of them for a collection, not `EntityReference`.
- The unused `toRequestBody()` method is gone from the generated request classes. Nothing called it, and for bound messages it also sent the binding id as a parameter.
