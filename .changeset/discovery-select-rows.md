---
"@mohsinonxrm/dataverse-sdk-discovery": major
---

**Breaking.** `listOrganizations({ select })` is typed by what comes back (#381). With `select`, the rows are `Pick<OrganizationDetail, K>[]` for the selected properties `K`, so `listOrganizations({ select: ["FriendlyName", "ApiUrl"] })` no longer claims `Url` and the other properties are there. `DiscoveryOptions.select` takes `OrganizationDetail` property names (`readonly (keyof OrganizationDetail)[]`) instead of any `string[]`. Options whose `select` may or may not be set (a `DiscoveryOptions` variable) resolve `Partial<OrganizationDetail>[]`; calls without `select` still resolve `OrganizationDetail[]`.

`toEnvironment()` throws `DataverseInvalidRequestError` for a row without `Url` or `ApiUrl` (one listed with a `$select` that leaves them out) instead of a `TypeError`. The `listOrganizations()` JSDoc now says an abort rejects with `DataverseAbortError`, as it does, not a `DOMException`.
