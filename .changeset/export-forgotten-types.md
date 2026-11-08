---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-batch": minor
"@mohsinonxrm/dataverse-sdk-files": minor
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-otel": minor
"@mohsinonxrm/dataverse-sdk-appinsights": minor
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

Every type the public API uses is now exported, so an app can name it, for example to type a wrapper or a mock (#397):

- core: `DependencyTelemetry` (what `TelemetryClient.trackDependency` receives, now a named interface), `BuiltInMiddlewareOptions`, and `EqValue` (the values `odata.eq()` / `odata.ne()` take). The per-request retry options are the same `RetryOptions` type as the client's, so there is one `RetryOptions`.
- batch: `DataverseBatchErrorConstructor`.
- files: `FileSource` (what `upload()` accepts).
- generator: `EntityKeyType`, and `RetrieveMetadataChangesResponse` with the metadata detail types it uses.
- otel, appinsights: their dependency data is core's `DependencyTelemetry`.
- metadata: `RequiredEntityProperty`.
