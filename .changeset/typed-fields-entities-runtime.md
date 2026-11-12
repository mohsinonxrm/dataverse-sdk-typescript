---
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

Typed attribute metadata (#482): `AttributeMetadata.attributeType` is `AttributeTypeCodeName | EdmPrimitiveType | (string & {})`, so the editor suggests the Dataverse attribute types (`"Picklist"`, `"Lookup"`, …, the new `AttributeTypeCodeName` type) and the OData primitives; `AttributeMetadata.odataType`, the values of `EntityMetadata.attributeTypes` and `formatParameterAlias()`'s `odataType` are core's `ODataTypeName`. Every string still compiles, so nothing narrows. `optionSetType` stays a `string`: it holds the generated enum's name.
