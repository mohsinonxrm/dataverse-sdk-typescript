---
"@mohsinonxrm/dataverse-sdk-generator": patch
---

Typed metadata shapes (#482): `PropertyType.AttributeType` and `AttributeMetadataDetail.AttributeType` are the metadata package's `AttributeTypeCode | (string & {})`; `SourceType` is `AttributeSourceType | (number & {})`; `Format` suggests the date and time behaviors and formats (and, on `AttributeMetadataDetail`, the string and integer formats); `AttributeMetadataDetail.DateTimeBehavior` and `AttributeTypeName` are the metadata package's types; `OptionSetMetadata.OptionSetType` is `OptionSetType | (string & {})`. Any string or number still compiles there.

What narrows: `DataverseGenConfig.apiVersion` is core's `ApiVersion` (`v<major>.<minor>`, such as `"v9.2"`) instead of `string`, as in `DataverseClientOptions`.
