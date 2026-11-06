---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-discovery": minor
"@mohsinonxrm/dataverse-sdk-batch": minor
---

Small API additions (#274):

- core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
- discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
- batch: `entityIdFromBatchResponse(part)` reads a created record's id from the `OData-EntityId` (or `Location`) header of a `$batch` response step or decoded part, like core's `entityIdFromResponse` does for a `Response`.
