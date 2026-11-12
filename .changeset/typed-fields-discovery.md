---
"@mohsinonxrm/dataverse-sdk-discovery": minor
---

Typed organization fields (#482): `OrganizationState` is also a type (`0 | 1`). A new `OrganizationType` constant object and type list Dataverse's organization types (`OrganizationType.Developer` is `13`). `OrganizationDetail.State` is `OrganizationState | (number & {})` and `OrganizationDetail.OrganizationType` is `OrganizationType | (number & {})`: the known values are suggested, and any number still type-checks (typed JSON, values Dataverse adds), so nothing narrows.
