---
"@mohsinonxrm/dataverse-sdk-appinsights": patch
---

`ApplicationInsightsTelemetryClient` warns when a client passes a `connectionString` different from the one Azure Monitor was already started with in the process (#384). Its telemetry still goes to the first resource; before, that happened silently. The warning is a `WARN` log record through the client's `logger` or `loggerProvider`, or else a single `console.warn` per process, and never includes either connection string.
