---
"@mohsinonxrm/dataverse-sdk-xrm": minor
---

`OrganizationService` results are typed (#284). `execute()` is now `execute<T>(request: Executable<T>, options?)`, like `client.execute()`, so `await service.execute(new WhoAmIFunction())` is a `WhoAmIResponse` with no type argument; a request that isn't an `Executable<T>` is a compile error (and still throws at run time for JavaScript callers). `retrieve()`, `retrieveMultiple()`, `RetrieveMultipleResult` and `create()`/`update()` with `returnRepresentation` default to the new exported `EntityRecord` type (`@odata.etag`, `@odata.context`, and `unknown` columns) instead of `any`. `update()` has the same overloads as `create()`: `Promise<void>` by default, `Promise<T>` with `{ returnRepresentation: true }`. `create()` and `update()` take the record as `object` instead of `Record<string, any>`, which accepts the same values (object literals and your own record interfaces) without `any`.
