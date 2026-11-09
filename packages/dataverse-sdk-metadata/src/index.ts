/**
 * Public exports for @mohsinonxrm/dataverse-sdk-metadata
 */

// Main client
export { MetadataClient } from "./MetadataClient.js";
export type {
  AttributeMetadataByCast,
  AttributeMetadataCast,
  AttributeQueryOptions,
  MetadataQueryOptions,
  RelationshipQueryOptions,
  MetadataWriteOptions,
} from "./MetadataClient.js";

// Builders for the create payloads (#345): Metadata.string(...), Metadata.entity(...), …
export { Metadata } from "./builders.js";
export type {
  BooleanColumnOptions,
  ChoiceColumnOptions,
  ChoiceOption,
  ChoiceOptionInput,
  ColumnOptions,
  ColumnRequiredLevel,
  DateAndTimeColumnOptions,
  DateOnlyColumnOptions,
  DateTimeColumnOptions,
  DecimalColumnOptions,
  DoubleColumnOptions,
  EntityDefinitionOptions,
  FileColumnOptions,
  GlobalChoiceColumnOptions,
  GlobalOptionSetOptions,
  ImageColumnOptions,
  IntegerColumnOptions,
  LabelInput,
  LabelLanguageOptions,
  LabelTexts,
  LocalChoiceColumnOptions,
  LookupColumnOptions,
  ManyToManyRelationshipOptions,
  MetadataBuilders,
  MemoColumnOptions,
  MoneyColumnOptions,
  PrimaryNameColumnOptions,
  StringColumnOptions,
} from "./builders.js";

// All metadata types
export * from "./types/index.js";
