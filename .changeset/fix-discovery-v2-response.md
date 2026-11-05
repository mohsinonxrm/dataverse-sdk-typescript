---
"@mohsinonxrm/dataverse-sdk-discovery": minor
---

`OrganizationDetail` now matches the Global Discovery Service v2.0 `Instance` response (#28). The response is flat: `Url`, `ApiUrl`, integer `State` (`0` = enabled, `1` = disabled), `Version`, `UrlName`, `UniqueName`, `FriendlyName`, `Region`, `EnvironmentId`, `TenantId`, `LastUpdated`, the other documented properties, and `FinOpsUrl` (returned live, though not documented). The old type had an `Endpoints` object, a `Geo` property and a string `State`, none of which the service returns, so `org.Endpoints.WebApiUrl` threw at runtime. The unused `OrganizationEndpoints` type is removed.

`getEnabledOrganizations()` now sends `$filter=State eq 0` instead of `State eq 'Enabled'`, and `getOrganizationsByRegion()` filters on `Region` instead of the nonexistent `Geo`.

New: `getOrganizationByUrl(url)` finds an environment by its application URL or `ApiUrl` (origins compared case-insensitively), `toEnvironment(org)` returns a camel-cased `DiscoveredEnvironment` (`url`, `apiUrl`, `webApiUrl`, `name`, `uniqueName`, `enabled`, `version`, `region`, `environmentId`), and `OrganizationState` names the `State` values.
