---
"@mohsinonxrm/dataverse-sdk-metadata": major
---

**Breaking.** The create types require what Dataverse needs, and the package exports only metadata types (#385):

- `EntityMetadataCreate` requires `SchemaName`, `DisplayName`, `DisplayCollectionName`, `OwnershipType`, `IsActivity`, `HasActivities`, `HasNotes` and `Attributes`, which Dataverse rejects a table create without. `Attributes` is a tuple whose first element is the primary name column, the new `PrimaryNameAttributeMetadataCreate` (a text column with `IsPrimaryName: true`); other columns may follow. `EntityMetadataCreate` is now an interface.
- The column create types (`StringAttributeMetadataCreate`, …) take `IsPrimaryName` only as `false`: a table's primary name column is created with the table, so a table create has exactly one.
- `AttributeMetadataCreateTypes` no longer includes `LookupAttributeMetadataCreate`, so `createAttributeDefinition()` doesn't accept a lookup: create it with its relationship, as the `Lookup` of `createOneToManyRelationship()`. `LookupAttributeMetadataCreate` is still exported for that.
- The package exports the metadata types only: the definitions, their create and update payloads, and the parameters and responses of the metadata operations `MetadataClient` calls. The other Web API complex types and enums (about 1,380 of them, such as `WhoAmIResponse` or `AIClassifyResponse`) are no longer exported; import them from `@mohsinonxrm/dataverse-sdk-actions`, `-functions` or `-messages`.
- `@mohsinonxrm/dataverse-sdk-messages` is no longer a dependency.
