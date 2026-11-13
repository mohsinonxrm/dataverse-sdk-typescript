/**
 * `DateTimeBehavior.Value`: how a date and time column stores and shows its value.
 */
export const DateTimeBehaviorValue = {
  /** Stored in UTC and shown in the user's time zone (the default). */
  UserLocal: "UserLocal",
  /** A date without a time; needs the `DateOnly` format. */
  DateOnly: "DateOnly",
  /** Stored and shown as entered, without time zone conversion. */
  TimeZoneIndependent: "TimeZoneIndependent",
} as const;

/** One of the values of {@link DateTimeBehaviorValue}. */
export type DateTimeBehaviorValue =
  (typeof DateTimeBehaviorValue)[keyof typeof DateTimeBehaviorValue];

/**
 * `MemoFormatName.Value`: the format of a multiline text column.
 */
export const MemoFormatNameValue = {
  Email: "Email",
  Json: "Json",
  RichText: "RichText",
  Text: "Text",
  TextArea: "TextArea",
} as const;

/** One of the values of {@link MemoFormatNameValue}. */
export type MemoFormatNameValue = (typeof MemoFormatNameValue)[keyof typeof MemoFormatNameValue];

/**
 * `AttributeTypeDisplayName.Value` (a column's `AttributeTypeName`): its type, more precisely than
 * `AttributeType` (which is `Virtual` for choices, file and image columns).
 */
export const AttributeTypeDisplayNameValue = {
  BigIntType: "BigIntType",
  BooleanType: "BooleanType",
  CalendarRulesType: "CalendarRulesType",
  CustomerType: "CustomerType",
  DateTimeType: "DateTimeType",
  DecimalType: "DecimalType",
  DoubleType: "DoubleType",
  EntityNameType: "EntityNameType",
  FileType: "FileType",
  ImageType: "ImageType",
  IntegerType: "IntegerType",
  LookupType: "LookupType",
  ManagedPropertyType: "ManagedPropertyType",
  MemoType: "MemoType",
  MoneyType: "MoneyType",
  MultiSelectPicklistType: "MultiSelectPicklistType",
  OwnerType: "OwnerType",
  PartyListType: "PartyListType",
  PicklistType: "PicklistType",
  StateType: "StateType",
  StatusType: "StatusType",
  StringType: "StringType",
  UniqueidentifierType: "UniqueidentifierType",
  VirtualType: "VirtualType",
} as const;

/** One of the values of {@link AttributeTypeDisplayNameValue}. */
export type AttributeTypeDisplayNameValue =
  (typeof AttributeTypeDisplayNameValue)[keyof typeof AttributeTypeDisplayNameValue];

/**
 * `AttributeMetadata.SourceType`: what fills a column. `null` for a column that can't be one of
 * these specialized columns.
 */
export const AttributeSourceType = {
  /** An ordinary column. */
  Simple: 0,
  /** A calculated column. */
  Calculated: 1,
  /** A rollup column. */
  Rollup: 2,
  /** A formula (Power Fx) column. */
  Formula: 3,
  /** A prompt column. */
  Prompt: 4,
} as const;

/** One of the values of {@link AttributeSourceType}. */
export type AttributeSourceType = (typeof AttributeSourceType)[keyof typeof AttributeSourceType];
