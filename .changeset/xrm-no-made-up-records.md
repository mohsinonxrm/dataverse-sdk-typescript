---
"@mohsinonxrm/dataverse-sdk-xrm": major
---

**Breaking.** `OrganizationService` no longer makes up a record or throws a plain `Error` (#381). `create()` and `update()` with `returnRepresentation: true` reject with `DataverseInvalidRequestError` when the response has no record (a `204 No Content` or an empty body), instead of resolving `{}` typed as `T`. `getEntitySetName()` (and the `assign()`, `setState()` and `associate()` calls that use it) rejects with `DataverseInvalidRequestError` when `EntityDefinitions` returns no `EntitySetName`, and `execute()` rejects a request that isn't an `Executable<T>` with `DataverseInvalidRequestError`; both were plain `Error`s. Every error `OrganizationService` throws is now a `DataverseError`.
