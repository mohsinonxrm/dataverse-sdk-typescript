---
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

Metadata builders (#345). The `Metadata` object (typed `MetadataBuilders`) has plain functions that return the create
payloads `MetadataClient` takes, with the `@odata.type`, labels (with their `LanguageCode`),
`RequiredLevel` and Dataverse's defaults filled in:

- `Metadata.label(text, lcid?)` or `Metadata.label({ 1033: "Name", 1036: "Nom" })`: a `Label`.
- `Metadata.entity(schemaName, { displayName, displayCollectionName, primaryName, attributes, … })`:
  an `EntityMetadataCreate`, its primary name column (`Metadata.primaryName`) first.
- Columns: `Metadata.string`, `memo`, `integer`, `decimal`, `double`, `money`, `dateTime`,
  `boolean`, `picklist`, `multiSelectPicklist`, `file` and `image`, each returning its
  `*AttributeMetadataCreate`. A choice takes its own `options` (labels, or `{ label, value }`) or
  a `globalOptionSetId`, exactly one.
- `Metadata.lookup(schemaName, { referencingEntity, referencedEntity, relationshipSchemaName, … })`:
  the `OneToManyRelationshipMetadataCreate` that creates the lookup column, for
  `createOneToManyRelationship`.
- `Metadata.manyToMany` and `Metadata.globalOptionSet` for N:N relationships and global choices.

The types reject a choice with both its own options and a global choice, the `DateOnly` behavior
without the `DateOnly` format, `SystemRequired`, and a table without its primary name or with a
lookup among its columns. At run time a builder throws `DataverseInvalidRequestError` for a schema
name without the customization prefix, an empty label, a length, precision or range out of
bounds, duplicate option values and a global choice id that isn't a GUID. Their option types
(`StringColumnOptions`, `ChoiceColumnOptions`, `LookupColumnOptions`, `EntityDefinitionOptions`, …)
are exported.
