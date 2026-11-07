---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-files": patch
---

Generated operations take one object with their parameters, by name, instead of positional arguments (#96).

The constructors took every CSDL parameter positionally, in `$metadata` order: `RetrieveEntityFunction` took `LogicalName` before `MetadataId` (both strings, so swapping them compiled and sent the wrong request), and `ImportSolutionAction` took 17 arguments, all typed as required.

- Each operation with parameters has a `<Class>Parameters` interface keyed by the CSDL parameter names, exported from the package root (`ImportSolutionActionParameters`, `RetrieveEntityFunctionParameters`, `MergeRequestParameters`): `new ImportSolutionAction({ CustomizationFile, ImportJobId, OverwriteUnmanagedCustomizations: true, PublishWorkflows: false })`.
- A parameter that `$metadata` marks `Nullable="false"` is required; any other is optional. A property that is left out or `undefined` isn't sent: action bodies leave it out, and function URLs leave out its parameter alias.
- The record id or entity set of a bound operation is still the first argument, before the parameters object: `new ExecuteWorkflowAction(workflowId, { EntityId })`, `new CreateMultipleAction("accounts", { Targets })`. It goes in the URL, not the request, so it isn't a parameter.
- An operation without parameters takes no arguments (`new WhoAmIFunction()`); one with only optional parameters can be constructed without arguments (`new RetrieveMetadataChangesFunction()`).
- Actions and functions keep the object in `parameters`; messages keep it in `OrganizationRequest.Parameters` (read-only), as the .NET SDK does, instead of one public property per parameter. A `MessageName` parameter is now a property like any other, so it follows `Nullable` instead of always being required.
- What `parseResponse` resolves for each kind of return type, including a `204 No Content`, is the return contract in the #300 entry: for example `undefined` for an operation with no return type, and `null` for an entity that wasn't set.
- dataverse-gen (`@mohsinonxrm/dataverse-sdk-generator`) generates custom API classes the same way. The record id of an operation bound to a table is named after the table (`accountId`) instead of `targetId`, and nullable parameters accept `null`.
- files: `FileColumnClient` calls the file-block actions with the new constructors.

`docs/migration-2.0.md` has before-and-after examples.
