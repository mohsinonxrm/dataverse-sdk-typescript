---
"@mohsinonxrm/dataverse-sdk-generator": minor
---

dataverse-gen doesn't generate the Web API's query functions (#342). **Breaking.**

`$metadata` declares `LastXDays`, `Between`, `In`, `EqualUserId` and the other query functions as functions, so dataverse-gen wrote a class for each, and `client.execute()` on any of them got a 404: Dataverse runs them only inside `$filter`. They are left out now, also when `functions` in the configuration lists them. The CLI prints a warning for each one listed, and `generateCode()` returns it in `warnings` (it resolved `void` before). Write them with `queryFunctions` from `@mohsinonxrm/dataverse-sdk-functions`.

A query function is an unbound function that returns `Edm.Boolean`, takes `PropertyName` (`Edm.String`) first, and has no `_` in its name. Custom APIs have a publisher prefix, so one of the same shape (`contoso_IsVip`) is still generated. `SchemaModel` has `QueryFunctionNames` (the ones it found) and `Warnings`.
