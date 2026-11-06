---
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

Typed attribute casts, `LabelLanguages`, a cached entity-set-name lookup, and escaped key values (#65).

- **Typed casts.** `getAttributeDefinitions()` and `getAttributeDefinition()` take `cast` (for example `"PicklistAttributeMetadata"`, `"LookupAttributeMetadata"`, `"StringAttributeMetadata"`). This reads through the `Microsoft.Dynamics.CRM.<cast>` path segment, so `select` and `expand` can use type-specific properties such as `OptionSet`, `Targets` and `MaxLength`. The result is typed as that metadata type. Both methods now also accept `expand`. New exported types: `AttributeQueryOptions`, `AttributeMetadataCast` and `AttributeMetadataByCast`.
- **`labelLanguages`.** Every read method accepts `labelLanguages` (one LCID or an array), sent as `LabelLanguages=1033[,…]`. `expand` also accepts an array.
- **`getEntitySetName(logicalName)`.** Returns the entity set name from metadata, for example `"opportunities"`. The first call loads every table's name in one request and caches it on the `MetadataClient`. A table that isn't in the cache is looked up on its own. `clearEntitySetNameCache()` forgets the cache.
- **Escaped keys.** Logical names, schema names, option set names and the `GetValid*` parameters are now OData string literals. `'` is doubled, and characters that would end the path are percent-encoded. `getEntityDefinition("x'y")` used to send a malformed URL (400). It now asks for `'x''y'`.
