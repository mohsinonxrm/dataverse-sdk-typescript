---
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

Known values for metadata properties that `$metadata` types as plain strings or numbers (#482), each a constant object and a type of the same name:

- `DateTimeBehaviorValue` (`UserLocal`, `DateOnly`, `TimeZoneIndependent`) for `DateTimeBehavior.Value`;
- `MemoFormatNameValue` (`Email`, `Json`, `RichText`, `Text`, `TextArea`) for `MemoFormatName.Value`;
- `AttributeTypeDisplayNameValue` (`StringType`, `PicklistType`, `MultiSelectPicklistType`, …) for `AttributeTypeDisplayName.Value`;
- `AttributeSourceType` (`Simple` 0, `Calculated` 1, `Rollup` 2, `Formula` 3, `Prompt` 4) for `SourceType` of `AttributeMetadata` and `ComplexAttributeMetadata`.

The properties are typed `Known | (string & {})` or `Known | (number & {})`: the editor suggests the known values, and any other string or number still compiles, since Dataverse adds values. Nothing narrows.
