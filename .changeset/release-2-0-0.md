---
"@mohsinonxrm/dataverse-sdk-actions": major
"@mohsinonxrm/dataverse-sdk-appinsights": major
"@mohsinonxrm/dataverse-sdk-auth-azure-identity": major
"@mohsinonxrm/dataverse-sdk-auth-msal-browser": major
"@mohsinonxrm/dataverse-sdk-auth-msal-node": major
"@mohsinonxrm/dataverse-sdk-batch": major
"@mohsinonxrm/dataverse-sdk-core": major
"@mohsinonxrm/dataverse-sdk-discovery": major
"@mohsinonxrm/dataverse-sdk-entities-runtime": major
"@mohsinonxrm/dataverse-sdk-files": major
"@mohsinonxrm/dataverse-sdk-functions": major
"@mohsinonxrm/dataverse-sdk-generator": major
"@mohsinonxrm/dataverse-sdk-messages": major
"@mohsinonxrm/dataverse-sdk-metadata": major
"@mohsinonxrm/dataverse-sdk-otel": major
"@mohsinonxrm/dataverse-sdk-xrm": major
---

**2.0.0.** Every package moves to 2.0.0 together. Several changes in this release alter existing behaviour:

- **auth-msal-browser:** `@azure/msal-browser` is now a peer dependency (3.x, 4.x or 5.x). Install it in your app (#147). A configured `account` no longer overrides MSAL's active account; pass `account: () => x` to pin one (#153).
- **core, logging:** nothing is logged by default. Pass `logger: new ConsoleLogger()` to see request logs. URLs in logs and telemetry are redacted unless you set `logging: { fullUrls: true }` or your own `redactUrl` (#160, #161).
- **core, retries:** a 429 or 503 with a `Retry-After` longer than `retry.maxRetryAfterMs` (default 30 s) is returned at once instead of being waited out; set `maxRetryAfterMs: Infinity` for the old behaviour. Failed `fetch` calls throw `DataverseNetworkError` instead of `TypeError`, and aborts throw `DataverseAbortError` (`name` is still `"AbortError"`). POST and PATCH without `If-Match` are no longer replayed after 502/503/504 (#146, #152, #164).
- **core, auth:** the token is fetched on every attempt, and a 401 triggers one refresh and one retry. The default middleware order is now ODataHeaders, Concurrency, Retry, Auth, Telemetry, Logging (#166).
- **discovery:** `OrganizationDetail` now matches the Global Discovery Service v2.0 response: flat `Url` / `ApiUrl`, and an integer `State`. `Endpoints`, `Geo` and `OrganizationEndpoints` are removed (#145).
- **errors:** every SDK error extends `DataverseError`; `statusCode` is a deprecated alias of `status` (#164).

See each package's CHANGELOG for the full list.
