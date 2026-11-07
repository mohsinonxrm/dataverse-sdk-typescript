---
"@mohsinonxrm/dataverse-sdk-core": patch
"@mohsinonxrm/dataverse-sdk-batch": patch
---

`associate()`, `disassociate()` and `bindMany()` now send their `$ref` requests with the builder's impersonation (`MSCRMCallerID` / `CallerObjectId`) and custom headers (#355). Before, `client.api(…).impersonate(userId).associate(…)` ran as the calling identity. They also take request options (`signal`, `timeoutMs`, `headers`, `correlationId`, …) as a last argument.

A `BindManyExecutor` receives those headers and options as a sixth argument, and `createBindManyExecutor()` from the batch package sends them on its `$batch`. It also does nothing for an empty list (it used to throw "Cannot execute empty batch"), associates an id listed twice once, and formats keys the way `associate()` does (`odataKey`).
