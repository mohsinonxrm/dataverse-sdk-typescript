---
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
"@mohsinonxrm/dataverse-sdk-generator": minor
---

Entities can be sent to the Web API as documented, and lookups are bound (#79).

- `IEntity.logicalName` is optional, and generated entity interfaces no longer declare it. The README examples posted entities with a `logicalName` property, which the Web API rejects with HTTP 400 ("Error identified in Payload provided by the user"). `formatEntityForWrite()` drops it.
- `formatEntityForWrite(entity, metadata, options?)` turns lookups into `@odata.bind`. An `EntityReference` value becomes `"<navigation property>@odata.bind": "/<entity set>(<id>)"`, and an array of references becomes an array of paths. A polymorphic lookup (`customerid`, `parentcustomerid`) is bound through the navigation property for the reference's table (`parentcustomerid_account`). The entity set comes from the new `EntityReference.entitySetName`, then `options.entitySetNames`, then `options.metadataCache` (pass the generated `EntityMetadataCache`). If none of them has it, it throws a `DataverseInvalidRequestError`. It now returns `Record<string, unknown>`.
- Generated single-valued navigation properties are typed `Target | EntityReference`, so `primarycontactid: createEntityReference("contact", id)` type-checks.
