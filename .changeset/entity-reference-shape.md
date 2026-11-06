---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
"@mohsinonxrm/dataverse-sdk-files": patch
---

A hand-written entity reference type-checks only in the shape the Web API reads (#251).

- **actions, messages: only `createEntityReference` makes an `EntityReference`.** Its `logicalName`, `id` and `entitySetName` are not enumerable, so they aren't sent. A hand-written `{ "@odata.type", logicalName, id }` literal type-checked as an `EntityReference` but sent `logicalName` and `id`, which Dataverse rejects. `EntityReference` now has a type-only brand, and `EntityPayload` and `AnyEntityPayload` declare `logicalName?: never` and `entitySetName?: never`, so that literal no longer type-checks as any entity parameter. Nothing changes at runtime.
- **New `WebApiEntityReference`**, exported from both packages: the JSON shape, `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: "<id>" }`, for a reference written by hand. It's accepted wherever a payload is (`crmbaseentity` parameters such as `Merge`'s `Target`).
- **Breaking (types only).** A reference must now come from the same package's `createEntityReference`: a messages or functions reference passed to an actions parameter, or the other way round, no longer type-checks. The functions package's `EntityReference` is unchanged, because a function parameter reads `logicalName`, `id` and `entitySetName` itself.
- **files:** `FileColumnClient` builds the `InitializeFileBlocksUpload` target as a `WebApiEntityReference`, without a cast.
