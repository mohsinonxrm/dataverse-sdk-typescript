---
"@mohsinonxrm/dataverse-sdk-xrm": minor
---

Every `OrganizationService` method now takes an `AbortSignal` (#273). `create()`, `retrieve()`, `update()`, `delete()`, `retrieveMultiple()`, `associate()` and `disassociate()` read `signal` from their options; `execute()`, `whoAmI()`, `getEntitySetName()`, `assign()` and `setState()` take a new optional last argument, `{ signal }` (the new exported `OperationOptions` type). Aborting the signal cancels the request in flight, and the entity set name lookups `assign()`, `setState()` and `associate()` make, and the call rejects with `DataverseAbortError`. A shared `getEntitySetName()` lookup is cancelled only when every caller waiting on it has aborted. Existing calls are unchanged. The `execute()` JSDoc no longer imports a `WhoAmIRequest` that doesn't exist.
