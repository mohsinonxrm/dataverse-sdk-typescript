---
"@mohsinonxrm/dataverse-sdk-core": minor
---

Telemetry is redacted, guarded and reports the real SDK version (#35, #36).

- **Redacted URLs.** `trackDependency` and `trackException` used to receive the full request URL, including filters, record ids and alternate keys. They now get origin and path, with GUID keys as `({id})`, other keys as `(…)` and the query as `?…`. Request logs use the same redaction. The new client option `redactUrl: (url: URL) => string` replaces it, and `defaultRedactUrl` is exported. Dependencies now also carry `target` (the host).
- **Never throws.** A telemetry client whose `trackDependency` or `trackException` throws no longer fails the request or replaces its error. The failure is logged with `logger.warn` and dropped.
- **`TELEMETRY_ENABLED`** in `x-ms-feature-usage` is now set only when a telemetry client is configured.
- **`SDK_VERSION`** is injected from `package.json` at build time and exported. `x-ms-sdk-version` and the `sdk.version` telemetry property used to report `0.1.0`.
