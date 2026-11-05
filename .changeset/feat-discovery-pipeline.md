---
"@mohsinonxrm/dataverse-sdk-discovery": minor
---

`DiscoveryClient` now sends its requests through the SDK pipeline instead of the global `fetch` (#30). New `DiscoveryClientOptions` are `fetchProvider`, `logger`, `telemetry` and `retry`, and every method takes a `signal`, which also cancels a retry wait. 429/502/503/504 responses are retried, honouring `Retry-After`. Errors are the core's typed errors: `DataverseODataError`, or `DataverseThrottleError` for 429, both `DataverseError`s with `status`, `code` and `requestId`. Before, a plain `Error` was thrown with the status pasted into its message, so the message no longer contains the status code. `getOrganization()` and `getOrganizationsByRegion()` now escape quotes in their arguments (`o'brien` → `'o''brien'`). `$select` names are percent-encoded like the other query options. `@odata.nextLink` pages are followed. The token is never sent to a next link on another host. New type export: `DiscoveryRequestOptions`.
