---
"@mohsinonxrm/dataverse-sdk-actions": minor
"@mohsinonxrm/dataverse-sdk-functions": minor
"@mohsinonxrm/dataverse-sdk-messages": minor
---

Complex types have their navigation properties (#231).

- The type generator ignored `NavigationProperty` elements on complex types, so `PrincipalAccess.Principal` was missing and `GrantAccess` and `ModifyAccess` needed a cast. Complex types now have their entity members, for example `PrincipalAccess.Principal`, `AuditDetail.AuditRecord`, `EntityCollection.Items` and `AttributeAuditDetail.OldValue` / `NewValue`.
- They are typed like entity-typed parameters:
  - `crmbaseentity` members are `EntityReference | AnyEntityPayload`;
  - a table is `EntityReference | EntityPayload<table>`;
  - `Collection(crmbaseentity)` is `Record<string, unknown>[]`;
  - `principal` is `EntityReference`.
- A member is required when the CSDL says `Nullable="false"`, so `PrincipalAccess` now requires `Principal`. Checked live: `new GrantAccessAction({ Target: target, PrincipalAccess: { Principal: createEntityReference("team", id), AccessMask } })` grants access, and `RevokeAccessAction` removes it.
- functions: `AnyEntityPayload` and `EntityPayload` are exported, because complex types use them.
