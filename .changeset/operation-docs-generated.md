---
"@mohsinonxrm/dataverse-sdk-actions": patch
"@mohsinonxrm/dataverse-sdk-functions": patch
"@mohsinonxrm/dataverse-sdk-messages": patch
---

The READMEs list only operations that exist, with their real constructors (#88). The operation lists and counts are now generated from the package source, and a test fails when they are stale.

- Removed classes that don't exist: `AssignAction`, `SetStateAction`, `AssignRequest`, `SetStateRequest`, `WhoAmIRequest`, `RetrievePrincipalAccessRequest`, `RetrieveMetadataChangesRequest`, `CreateEntityRequest` and `CreateAttributeRequest`. Assign and SetState aren't Web API actions; the READMEs show the record update to use instead.
- Fixed the examples for `WinOpportunity` (with `Caller`), `ExecuteWorkflow` (`asyncoperationid`), `InitializeFrom`, `RetrieveMetadataChanges`, `ExportSolution` and `ImportSolution` (parameter order).
- The file actions are documented as unbound, and with the right parameter order.
- Removed the false claim that a target without `@odata.type` throws client-side.
- The custom-function example no longer uses a `.query()` method, which doesn't exist.
