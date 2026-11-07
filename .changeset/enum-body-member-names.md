---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Enum values in action and message bodies are sent as member names (#232).

- **Dataverse rejects a number.** A test against a live org found that `GrantAccess` with `"AccessMask": 1` gets 400: "Cannot read the value '1' as a quoted JSON string value". It accepts `"ReadAccess"`, `"ReadAccess, WriteAccess"`, or the number as a string (`"1"`). The generated enums are numeric, so every action and message that put an enum in its body failed, among them `GrantAccess`, `ModifyAccess`, `GenerateSharedLink`, `BulkDelete`, `QueryExpressionToFetchXml`, `ImportSolution`, `AddPrivilegesRole`, `CreatePolymorphicLookupAttribute` and others.
- **The fix.** These operations pass each such parameter through a generated `internal/enumBody.ts`, which writes member names. A flags enum is written as its bits joined with `, `, for example `AccessRights.ReadAccess | AccessRights.WriteAccess` becomes `"ReadAccess, WriteAccess"`. This also works inside complex types, at any depth, in arrays, and in derived types picked by `@odata.type` (a `QueryExpression` given for a `QueryBase`). Values with no matching member are sent as the number in a string, and strings are sent unchanged. The caller's objects aren't modified.
- **The enums are exported from the package roots**, as in the functions package. For example, `import { AccessRights, LogicalOperator } from "@mohsinonxrm/dataverse-sdk-actions"`.
