---
"@mohsinonxrm/dataverse-sdk-metadata": patch
---

`CreateCustomerRelationshipsParams` and `CreatePolymorphicLookupAttributeParams` now match the actions' parameters: `Lookup` is a `ComplexLookupAttributeMetadata` (`Targets`, `Format`, `RequiredLevel`, `@odata.type`, ...), `OneToManyRelationships` are `ComplexOneToManyRelationshipMetadata` (`CascadeConfiguration`, `ReferencedAttribute`, ...), and both accept `SolutionUniqueName`.
