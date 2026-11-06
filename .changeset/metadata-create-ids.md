---
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

Metadata creates read the new id from `OData-EntityId`, and creates and updates can target a solution (#64).

- **Ids from the header.** `createEntityDefinition`, `createAttributeDefinition`, `createOneToManyRelationship`, `createManyToManyRelationship` and `createGlobalOptionSet` no longer send `Prefer: return=representation`, which made Dataverse serialize the whole new definition back, or depend on a body. They read the `MetadataId` from the `OData-EntityId` header of the `204 No Content` response, falling back to `MetadataId` in a JSON body. A failed create rejects with the Dataverse error (`DataverseODataError`), and a response with no id at all rejects with `DataverseInvalidRequestError`.
- **Solutions.** Every create and update takes an optional last argument, `MetadataWriteOptions` (`{ solutionUniqueName }`), sent as the `MSCRM.SolutionUniqueName` header.
- **`mergeAndUpdateEntityDefinition(logicalName, changes, options?)`.** Metadata updates are `PUT`s that replace the definition, so a partial object resets the properties it leaves out. This new method retrieves the current definition, applies `changes`, and `PUT`s the result. The JSDoc and docs now say this about every `update*` method.
