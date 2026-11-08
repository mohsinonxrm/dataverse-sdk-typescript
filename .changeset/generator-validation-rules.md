---
"@mohsinonxrm/dataverse-sdk-generator": minor
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

Validation rules from metadata, checked by an opt-in `validateEntity()` (#347).

- **entities-runtime**: `validateEntity(entity, metadata, { mode })` returns the `ValidationIssue`s of a create or update body: a business-required column or lookup missing or `null`, a column or lookup the mode can't set, text over `maxLength`, a number outside `minValue`/`maxValue` or a fraction in a whole-number column, a value that isn't one of a choice column's options, and a value of the wrong type. `AttributeMetadata` has `maxLength`, `minValue`, `maxValue`, `optionValues`, `isValidForCreate` and `isValidForUpdate`; `NavigationMetadata` has `lookupAttribute`, `isRequired`, `requiredLevel`, `isValidForCreate` and `isValidForUpdate`.
- **generator**: the generated entity metadata carries those constraints (`MinValue` and `MaxValue` are now read from RetrieveMetadataChanges too). The schema model's `PropertyType` has `MaxLength`, `MinValue`, `MaxValue` and `OptionValues`, and `NavigationPropertyType` has `RequiredLevel`.
