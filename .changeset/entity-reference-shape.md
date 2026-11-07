---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
"@mohsinonxrm/dataverse-sdk-files": patch
---

A hand-written entity reference type-checks only in the shape the Web API reads (#251).

- **actions, messages: only `createEntityReference` makes an `EntityReference`.** Its `logicalName`, `id` and `entitySetName` are not enumerable, so they aren't sent. A hand-written `{ "@odata.type", logicalName, id }` literal type-checked as an `EntityReference` but sent `logicalName` and `id`, which Dataverse rejects. `EntityReference` now has a type-only brand, and `EntityPayload` and `AnyEntityPayload` declare `logicalName?: never` and `entitySetName?: never`, so that literal no longer type-checks as any entity parameter. Nothing changes at runtime.
- **New `WebApiEntityReference`**: the JSON shape, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`, for a reference written by hand. It's accepted wherever a payload is (`crmbaseentity` parameters such as `Merge`'s `Target`). Since #295 it is defined in entities-runtime and re-exported by actions, functions, messages and xrm.
- **Breaking (types only).** An `EntityReference` must come from `createEntityReference`. Since #295 that is one function, and one `EntityReference` type, for the whole SDK, so a reference made with any package's `createEntityReference` is accepted by every package.
- **files:** `FileColumnClient` builds the `InitializeFileBlocksUpload` target as a `WebApiEntityReference`, without a cast.
