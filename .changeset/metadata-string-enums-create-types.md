---
"@mohsinonxrm/dataverse-sdk-metadata": minor
---

Metadata enums are string member names, and the create types model what the Web API needs (#66, #171).

- **Enums are names (#66).** The Web API reads and writes enum members only by name. Checked live: a create with `"OwnershipType": 1` or `"RequiredLevel": { "Value": 2 }` is rejected (`0x80048d19`), and responses carry `"UserOwned"`. The 61 generated enums (`OwnershipTypes`, `AttributeRequiredLevel`, `StringFormat`, `LogicalOperator`, …) are now string-valued `as const` objects with a matching string-union type. So `OwnershipTypes.UserOwned === "UserOwned"`, either form type-checks, and comparing a retrieved value with a member works. Code that compared with numbers (`entity.OwnershipType === 1`) never matched at runtime, and now fails to compile. Each member's JSDoc keeps its numeric value.
- **Create types (#171).**
  - New `*AttributeMetadataCreate` types: `StringAttributeMetadataCreate`, `IntegerAttributeMetadataCreate`, `LookupAttributeMetadataCreate`, `PicklistAttributeMetadataCreate`, and the other creatable column types.
  - `AttributeMetadataCreateTypes` is now their union, discriminated on `@odata.type`, so narrowing reaches `MaxLength`, `MinValue` and the other type-specific properties. The abstract `AttributeMetadata` and `EnumAttributeMetadata`, which Dataverse refuses to create, are no longer members.
  - Column, relationship and global choice creates require `@odata.type`, and Dataverse rejects them without it. Table creates accept it optionally.
  - Create types omit server-set properties (`MetadataId`, `ObjectTypeCode`, …).
  - Update types make every property optional and accept a retrieved definition.
  - `Label` and `LocalizedLabel` accept their `@odata.type`, and `LocalizedLabel.Label` and `LanguageCode` are required.
  - `OptionSetType`, `RelationshipType` and `SecurityTypes` are typed with their enums.
- **Type tests run in CI.** The package's `test` script now also runs `tsd` on `test/types.test-d.ts`.
