---
"@mohsinonxrm/dataverse-sdk-core": minor
"@mohsinonxrm/dataverse-sdk-discovery": minor
"@mohsinonxrm/dataverse-sdk-batch": minor
---

Small API additions (#274):

- core: `buildUrl(request)` is exported. It returns the exact URL `fetch` receives for a `RequestInformation` (the URL plus `request.query`, encoded the SDK's way), so middleware can log or inspect it without re-encoding the query.
- discovery: `DiscoveryClientOptions.middleware` customises the discovery pipeline (`prepend`, `append`, `replace`), as `DataverseClientOptions.middleware` does, so requests can be recorded without wrapping `fetchProvider`.
- batch: `entityIdFromBatchResponse(part, options?)` returns the id of the record a create in a `$batch` made, from a `BatchResponseStep` or a decoded `BatchResponsePart`. A plain create's id comes from its `OData-EntityId` (or `Location`) header. A create sent with `Prefer: return=representation` is answered `201` with no id header (verified live, inside and outside a change set), so pass `{ primaryIdAttribute: "contactid" }` to read the id from the returned record. It throws `DataverseInvalidRequestError` saying what is missing when neither has an id.
