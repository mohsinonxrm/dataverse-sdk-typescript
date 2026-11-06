import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/** The `@odata.type` of a metadata type in a payload: `"Microsoft.Dynamics.CRM.<Name>"`. */
export type MetadataODataType<Name extends string> = `Microsoft.Dynamics.CRM.${Name}`;

/** Properties Dataverse sets on every metadata component; a create must not send them. */
export type ServerSetMetadataProperty =
  "MetadataId" | "HasChanged" | "IsManaged" | "IntroducedVersion" | "CreatedOn" | "ModifiedOn";

/** Attribute properties Dataverse computes; a create must not send them. */
export type ServerSetAttributeProperty =
  | ServerSetMetadataProperty
  | "AttributeOf"
  | "ColumnNumber"
  | "DeprecatedVersion"
  | "EntityLogicalName"
  | "IsCustomAttribute"
  | "IsLogical"
  | "IsValidODataAttribute";

/**
 * A create payload for metadata type `T`: the server-set properties removed, and
 * `@odata.type` (as `Microsoft.Dynamics.CRM.<Name>`) and `SchemaName` required.
 */
export type AttributeMetadataCreate<T extends AttributeMetadata, Name extends string> = Omit<
  T,
  ServerSetAttributeProperty | "@odata.type" | "SchemaName"
> & {
  "@odata.type": MetadataODataType<Name>;
  SchemaName: string;
};

/** Create payload for a text column. */
export type StringAttributeMetadataCreate = AttributeMetadataCreate<
  StringAttributeMetadata,
  "StringAttributeMetadata"
>;
/** Create payload for a multiline text column. */
export type MemoAttributeMetadataCreate = AttributeMetadataCreate<
  MemoAttributeMetadata,
  "MemoAttributeMetadata"
>;
/** Create payload for a whole number column. */
export type IntegerAttributeMetadataCreate = AttributeMetadataCreate<
  IntegerAttributeMetadata,
  "IntegerAttributeMetadata"
>;
/** Create payload for a big integer column. */
export type BigIntAttributeMetadataCreate = AttributeMetadataCreate<
  BigIntAttributeMetadata,
  "BigIntAttributeMetadata"
>;
/** Create payload for a decimal number column. */
export type DecimalAttributeMetadataCreate = AttributeMetadataCreate<
  DecimalAttributeMetadata,
  "DecimalAttributeMetadata"
>;
/** Create payload for a floating point number column. */
export type DoubleAttributeMetadataCreate = AttributeMetadataCreate<
  DoubleAttributeMetadata,
  "DoubleAttributeMetadata"
>;
/** Create payload for a currency column. */
export type MoneyAttributeMetadataCreate = AttributeMetadataCreate<
  MoneyAttributeMetadata,
  "MoneyAttributeMetadata"
>;
/** Create payload for a date and time column. */
export type DateTimeAttributeMetadataCreate = AttributeMetadataCreate<
  DateTimeAttributeMetadata,
  "DateTimeAttributeMetadata"
>;
/** Create payload for a yes/no column. */
export type BooleanAttributeMetadataCreate = AttributeMetadataCreate<
  BooleanAttributeMetadata,
  "BooleanAttributeMetadata"
>;
/** Create payload for a choice column. */
export type PicklistAttributeMetadataCreate = AttributeMetadataCreate<
  PicklistAttributeMetadata,
  "PicklistAttributeMetadata"
>;
/** Create payload for a choices (multi-select) column. */
export type MultiSelectPicklistAttributeMetadataCreate = AttributeMetadataCreate<
  MultiSelectPicklistAttributeMetadata,
  "MultiSelectPicklistAttributeMetadata"
>;
/**
 * Create payload for a lookup column. A lookup is created through its 1:N relationship
 * (`createOneToManyRelationship`), as the relationship's `Lookup`.
 */
export type LookupAttributeMetadataCreate = AttributeMetadataCreate<
  LookupAttributeMetadata,
  "LookupAttributeMetadata"
>;
/** Create payload for a file column. */
export type FileAttributeMetadataCreate = AttributeMetadataCreate<
  FileAttributeMetadata,
  "FileAttributeMetadata"
>;
/** Create payload for an image column. */
export type ImageAttributeMetadataCreate = AttributeMetadataCreate<
  ImageAttributeMetadata,
  "ImageAttributeMetadata"
>;
/** Create payload for a unique identifier column. */
export type UniqueIdentifierAttributeMetadataCreate = AttributeMetadataCreate<
  UniqueIdentifierAttributeMetadata,
  "UniqueIdentifierAttributeMetadata"
>;

/**
 * AttributeMetadataCreateTypes - the column types a create can send, as a union discriminated on
 * `@odata.type`. Checking `@odata.type` narrows to the matching type:
 *
 * ```typescript
 * if (attr["@odata.type"] === "Microsoft.Dynamics.CRM.StringAttributeMetadata") attr.MaxLength;
 * ```
 *
 * The abstract `AttributeMetadata` and `EnumAttributeMetadata` are not included: Dataverse
 * rejects them ("Attribute of type AttributeMetadata cannot be created").
 */
export type AttributeMetadataCreateTypes =
  | StringAttributeMetadataCreate
  | MemoAttributeMetadataCreate
  | IntegerAttributeMetadataCreate
  | BigIntAttributeMetadataCreate
  | DecimalAttributeMetadataCreate
  | DoubleAttributeMetadataCreate
  | MoneyAttributeMetadataCreate
  | DateTimeAttributeMetadataCreate
  | BooleanAttributeMetadataCreate
  | PicklistAttributeMetadataCreate
  | MultiSelectPicklistAttributeMetadataCreate
  | LookupAttributeMetadataCreate
  | FileAttributeMetadataCreate
  | ImageAttributeMetadataCreate
  | UniqueIdentifierAttributeMetadataCreate;
