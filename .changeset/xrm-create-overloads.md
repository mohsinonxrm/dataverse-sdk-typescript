---
"@mohsinonxrm/dataverse-sdk-xrm": minor
---

`OrganizationService.create()` now has precise overloads: it resolves `Promise<string>` (the new id) by default and `Promise<T>` only with `{ returnRepresentation: true }`, instead of `Promise<string | any>`.
