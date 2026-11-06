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

**2.0.0.** Every package moves to 2.0.0 together. Most of 2.0 fixes code that didn't work against Dataverse in 1.0, and several changes alter existing behaviour. See [docs/migration-2.0.md](https://github.com/mohsinonxrm/dataverse-sdk-typescript/blob/main/docs/migration-2.0.md) for what to change. In short:

- **Install:** Node 22+. `@azure/msal-browser`, `@azure/msal-node`, and the OpenTelemetry and Azure Monitor packages are now peer dependencies of the auth and telemetry packages (#24, #85, #159).
- **core:** nothing is logged by default. URLs in logs and telemetry are redacted.
- **core, retries:** a `Retry-After` beyond `retry.maxRetryAfterMs` (30 s) is returned instead of waited out, and non-idempotent requests aren't replayed after 502/503/504.
- **core, timeouts:** `timeoutMs` covers the whole request.
- **core, pipeline:** the default middleware order is ODataHeaders, Retry, Concurrency, Auth, Telemetry, Logging.
- **core, queries:** query options are encoded with `%20`, and `expand()` calls add up.
- **errors:** every SDK error extends `DataverseError`. Network failures and aborts are `DataverseNetworkError` and `DataverseAbortError`. A 412 is a `DataverseDuplicateError` only for `0x80040333`.
- **metadata:** enums are string member names, and creates return the id from `OData-EntityId`.
- **xrm:** record ids must be GUIDs, and entity sets come from metadata.
- **discovery:** `OrganizationDetail` matches the v2.0 response.
- **actions, functions, messages:**
  - bulk operations take the entity set first;
  - `createEntityReference` returns the Web API shape and takes an options object;
  - single-entity returns are the entity;
  - `toRequestBody()` is removed.

See each package's CHANGELOG for the full list.
