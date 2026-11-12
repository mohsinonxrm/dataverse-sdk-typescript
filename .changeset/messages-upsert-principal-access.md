---
"@mohsinonxrm/dataverse-sdk-messages": minor
---

`UpsertRequest`, `RetrievePrincipalAccessRequest` and `CheckPrivilegeRequest`, with the shapes of the .NET messages (#435).

- `new UpsertRequest({ Target, Key? })` creates the record when no record has its key and updates it otherwise: `PATCH /<set>(<key>)` without `If-Match`. `Key` is a GUID or an alternate key (`{ accountnumber: "A-1" }`); without it, `Target`'s primary key column is the key. The response has `RecordCreated` and `Target` (a reference), as in .NET: the request sends `Prefer: return=representation` with `$select` of the primary key, and Dataverse answers `201 Created` for a create and `200 OK` for an update.
- `new RetrievePrincipalAccessRequest({ Principal, Target })` is one message for the function's three bindings: the `Principal` reference (a systemuser, team or organization) picks it. `response.AccessRights` is the rights as `AccessRights` flags (the Web API sends member names, `"ReadAccess, WriteAccess"`, which stay in `result.AccessRights`).
- `new CheckPrivilegeRequest({ UserId, PrivilegeName, Depth? })` answers whether a user has a privilege through their roles or their teams' roles (`HasPrivilege`, and the deepest `Depth`). Dataverse has no CheckPrivilege message: it runs RetrieveUserPrivilegeByPrivilegeName, as Microsoft's "Verifying access in code" does.

The package root's `UpsertResponse` and `RetrievePrincipalAccessResponse` are now these messages' response classes. They were type-only exports of the CSDL complex types of the same names (`{ ResponseName?, Results? }` and `{ AccessRights? }`), which no message's `execute()` resolved (`UpsertMultipleResult.Results` keeps the complex type's shape).
