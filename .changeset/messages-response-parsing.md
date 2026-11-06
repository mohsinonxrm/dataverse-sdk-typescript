---
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Message responses read their result correctly (#70).

- An entity or complex-type return is the response body itself, without its top-level `@odata.*` annotations. Before, every response read `body.value`, so `result` was `undefined` for 962 of the 1356 messages, including `QueryExpressionToFetchXmlResponse` (`result.FetchXml`), `ExecuteWorkflowResponse` (`result.asyncoperationid`) and `ExportSolutionResponse` (`result.ExportSolutionFile`). Primitive and collection returns are still read from `value`.
- `result` no longer references its own response class. A complex return type with the same name is imported as `<Name>Data`, for example `QueryExpressionToFetchXmlResponseData`. A `crmbaseentity` return is typed `Record<string, unknown>`, or `Record<string, unknown>[]` for a collection, not `EntityReference`.
- The unused `toRequestBody()` method is gone from the generated request classes. Nothing called it, and for bound messages it also sent the binding id as a parameter.
