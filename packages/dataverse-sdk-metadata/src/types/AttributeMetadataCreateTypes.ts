import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/** The `@odata.type` of a metadata type in a payload: `"Microsoft.Dynamics.CRM.<Name>"`. */
export type MetadataODataType<Name extends string> = `Microsoft.Dynamics.CRM.${Name}`;

/** Properties Dataverse sets on every metadata component; a create must not send them. */
export type ServerSetMetadataProperty =
  "MetadataId" | "HasChanged" | "IsManaged" | "IntroducedVersion" | "CreatedOn" | "ModifiedOn";

/**
 * Attribute properties Dataverse computes (read-only in the SDK's `AttributeMetadata`, and
 * ignored in a create); a create must not send them. A column's type comes from `@odata.type`,
 * not `AttributeType`.
 */
export type ServerSetAttributeProperty =
  | ServerSetMetadataProperty
  | "AttributeOf"
  | "AttributeType"
  | "AttributeTypeName"
  | "CanBeSecuredForCreate"
  | "CanBeSecuredForRead"
  | "CanBeSecuredForUpdate"
  | "ColumnNumber"
  | "DeprecatedVersion"
  | "EntityLogicalName"
  | "InheritsFrom"
  | "IsCustomAttribute"
  | "IsLogical"
  | "IsPrimaryId"
  | "IsRequiredForForm"
  | "IsValidForForm"
  | "IsValidForGrid"
  | "IsValidForRead"
  | "IsValidODataAttribute";

/**
 * A create payload for metadata type `T`: the server-set properties (`ServerSetAttributeProperty`
 * and the type's own `ServerSet`) removed, and `@odata.type` (as `Microsoft.Dynamics.CRM.<Name>`)
 * and `SchemaName` required. `IsPrimaryName` can only be `false`: a table's primary name column
 * is created with the table (`PrimaryNameAttributeMetadataCreate` in `EntityMetadataCreate`).
 */
export type AttributeMetadataCreate<
  T extends AttributeMetadata,
  Name extends string,
  ServerSet extends string = never,
> = Omit<
  T,
  ServerSetAttributeProperty | ServerSet | "@odata.type" | "SchemaName" | "IsPrimaryName"
> & {
  "@odata.type": MetadataODataType<Name>;
  SchemaName: string;
  IsPrimaryName?: false;
};

/** An option of a choice in a create payload: the server-set properties removed. */
export type OptionMetadataCreate = Omit<OptionMetadata, "HasChanged" | "IsManaged" | "MetadataId">;

/**
 * The local choice a choice column creates with it (the column's `OptionSet`). Dataverse needs
 * `IsGlobal: false` ("IsGlobal is not specified" otherwise); `@odata.type` is optional, as the
 * property is declared as `OptionSetMetadata`.
 */
export type LocalOptionSetMetadataCreate = Omit<
  OptionSetMetadata,
  ServerSetMetadataProperty | "IsCustomOptionSet" | "@odata.type" | "IsGlobal" | "Options"
> & {
  "@odata.type"?: MetadataODataType<"OptionSetMetadata">;
  IsGlobal: false;
  Options?: OptionMetadataCreate[];
};

/**
 * An existing global choice to bind a column to, as `"GlobalOptionSet@odata.bind"`:
 * `"/GlobalOptionSetDefinitions(<MetadataId>)"`. Dataverse takes only the `MetadataId` here;
 * `(Name='…')` is rejected ("Guid should contain 32 digits"), so look the id up with
 * `getGlobalOptionSet(name)` or keep the one `createGlobalOptionSet` returns.
 */
export type GlobalOptionSetBind = `/GlobalOptionSetDefinitions(${string})`;

/**
 * A choice (single or multi-select) column create. It has its own options (`OptionSet`, a local
 * choice created with the column) or uses an existing global choice
 * (`"GlobalOptionSet@odata.bind"`): exactly one of the two.
 */
export type ChoiceAttributeMetadataCreate<
  T extends EnumAttributeMetadata,
  Name extends string,
  ServerSet extends string = never,
> = Omit<AttributeMetadataCreate<T, Name, ServerSet>, "OptionSet" | "GlobalOptionSet"> &
  (
    | { OptionSet: LocalOptionSetMetadataCreate; "GlobalOptionSet@odata.bind"?: never }
    | { "GlobalOptionSet@odata.bind": GlobalOptionSetBind; OptionSet?: never }
  );

/** Create payload for a text column. */
export type StringAttributeMetadataCreate = AttributeMetadataCreate<
  StringAttributeMetadata,
  "StringAttributeMetadata",
  "DatabaseLength" | "IsLocalizable" | "SourceTypeMask"
>;
/** Create payload for a multiline text column. */
export type MemoAttributeMetadataCreate = AttributeMetadataCreate<
  MemoAttributeMetadata,
  "MemoAttributeMetadata",
  "IsLocalizable"
>;
/** Create payload for a whole number column. */
export type IntegerAttributeMetadataCreate = AttributeMetadataCreate<
  IntegerAttributeMetadata,
  "IntegerAttributeMetadata",
  "SourceTypeMask"
>;
/** Create payload for a big integer column. */
export type BigIntAttributeMetadataCreate = AttributeMetadataCreate<
  BigIntAttributeMetadata,
  "BigIntAttributeMetadata"
>;
/** Create payload for a decimal number column. */
export type DecimalAttributeMetadataCreate = AttributeMetadataCreate<
  DecimalAttributeMetadata,
  "DecimalAttributeMetadata",
  "SourceTypeMask"
>;
/** Create payload for a floating point number column. */
export type DoubleAttributeMetadataCreate = AttributeMetadataCreate<
  DoubleAttributeMetadata,
  "DoubleAttributeMetadata",
  "SourceTypeMask"
>;
/** Create payload for a currency column. */
export type MoneyAttributeMetadataCreate = AttributeMetadataCreate<
  MoneyAttributeMetadata,
  "MoneyAttributeMetadata",
  "CalculationOf" | "IsBaseCurrency" | "SourceTypeMask"
>;
/**
 * Create payload for a date and time column. `MinSupportedValue` and `MaxSupportedValue` are
 * fixed by Dataverse and only returned on reads.
 */
export type DateTimeAttributeMetadataCreate = AttributeMetadataCreate<
  DateTimeAttributeMetadata,
  "DateTimeAttributeMetadata",
  "MaxSupportedValue" | "MinSupportedValue" | "SourceTypeMask"
>;
/** Create payload for a yes/no column. */
export type BooleanAttributeMetadataCreate = AttributeMetadataCreate<
  BooleanAttributeMetadata,
  "BooleanAttributeMetadata",
  "SourceTypeMask"
>;
/**
 * Create payload for a choice column: its own options in `OptionSet`, or an existing global
 * choice in `"GlobalOptionSet@odata.bind"`.
 */
export type PicklistAttributeMetadataCreate = ChoiceAttributeMetadataCreate<
  PicklistAttributeMetadata,
  "PicklistAttributeMetadata",
  "ChildPicklistLogicalNames" | "SourceTypeMask"
>;
/**
 * Create payload for a choices (multi-select) column: its own options in `OptionSet`, or an
 * existing global choice in `"GlobalOptionSet@odata.bind"`.
 */
export type MultiSelectPicklistAttributeMetadataCreate = ChoiceAttributeMetadataCreate<
  MultiSelectPicklistAttributeMetadata,
  "MultiSelectPicklistAttributeMetadata",
  "ChildPicklistLogicalNames" | "SourceTypeMask"
>;
/**
 * Create payload for a lookup column. A lookup is created through its 1:N relationship
 * (`createOneToManyRelationship`), as the relationship's `Lookup`, so it is not one of the
 * `AttributeMetadataCreateTypes` that `createAttributeDefinition` takes.
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
 * rejects them ("Attribute of type AttributeMetadata cannot be created"). Nor is a lookup: it is
 * created with its relationship, as the `Lookup` of `createOneToManyRelationship`
 * (`LookupAttributeMetadataCreate`).
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
  | FileAttributeMetadataCreate
  | ImageAttributeMetadataCreate
  | UniqueIdentifierAttributeMetadataCreate;
