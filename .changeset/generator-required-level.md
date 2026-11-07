---
"@mohsinonxrm/dataverse-sdk-generator": patch
"@mohsinonxrm/dataverse-sdk-entities-runtime": minor
---

`dataverse-gen` now marks business-required columns: the Web API sends `RequiredLevel.Value` as the member name (`"ApplicationRequired"`), which was compared to the number `2`, so no generated column was ever `isRequired`. Generated attribute metadata also gets `requiredLevel` (`SystemRequired`, `ApplicationRequired` or `Recommended`) for any level other than `None`; `AttributeMetadata` in entities-runtime has the new optional field.
