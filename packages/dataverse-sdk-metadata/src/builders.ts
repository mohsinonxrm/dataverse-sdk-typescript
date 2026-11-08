/**
 * Metadata builders (#345): plain functions that return the `*Create` payloads `MetadataClient`
 * takes, with the parts that are easy to get wrong filled in: the `@odata.type`, labels with
 * their `LanguageCode`, `RequiredLevel`, a local choice's `IsGlobal: false`, a global choice's
 * bind path, and Dataverse's defaults for length and precision.
 *
 * Exported as the `Metadata` object (typed `MetadataBuilders`):
 *
 * ```typescript
 * import { Metadata, MetadataClient } from "@mohsinonxrm/dataverse-sdk-metadata";
 *
 * await metadata.createAttributeDefinition(
 *   "new_project",
 *   Metadata.string("new_Code", { displayName: "Code", maxLength: 20 })
 * );
 * ```
 *
 * Each builder checks its input and throws `DataverseInvalidRequestError` (`InvalidParameter`) for
 * a value Dataverse would reject: a schema name without a customization prefix, a length or
 * precision out of range, a minimum above the maximum, duplicate option values. The result is
 * an ordinary object of the create type; spread it to set a property the builder doesn't take:
 * `{ ...Metadata.string("new_Code", { displayName: "Code" }), IsAuditEnabled: { Value: true } }`.
 */
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  AttributeMetadataCreateTypes,
  AttributeRequiredLevel,
  BooleanAttributeMetadataCreate,
  CascadeConfiguration,
  DateTimeAttributeMetadataCreate,
  DecimalAttributeMetadataCreate,
  DoubleAttributeMetadataCreate,
  EntityMetadataCreate,
  FileAttributeMetadataCreate,
  ImageAttributeMetadataCreate,
  IntegerAttributeMetadataCreate,
  IntegerFormat,
  Label,
  LocalOptionSetMetadataCreate,
  ManyToManyRelationshipMetadataCreate,
  MemoAttributeMetadataCreate,
  MoneyAttributeMetadataCreate,
  MultiSelectPicklistAttributeMetadataCreate,
  OneToManyRelationshipMetadataCreate,
  OptionMetadataCreate,
  OptionSetMetadataCreate,
  PicklistAttributeMetadataCreate,
  PrimaryNameAttributeMetadataCreate,
  StringAttributeMetadataCreate,
  StringFormat,
} from "./types/index.js";

// ==================== Inputs ====================

/** A label: its text in one language, or a complete `Label`. */
export type LabelInput = string | Label;

/**
 * The texts of a label by language, e.g. `{ 1033: "Name", 1036: "Nom" }`. Each key is a
 * language's LCID.
 */
export type LabelTexts = Readonly<Record<number, string>>;

/**
 * The requirement levels a custom column can have. `SystemRequired` is for columns Dataverse
 * owns, and a create with it is rejected.
 */
export type ColumnRequiredLevel = Exclude<AttributeRequiredLevel, "SystemRequired">;

/** What every builder that takes a label as text can be told about its language. */
export interface LabelLanguageOptions {
  /**
   * The language (LCID) of the labels given as text. Default `1033` (English). Dataverse needs a
   * label in the organization's base language, so pass yours if it isn't English.
   */
  languageCode?: number;
}

/** The options every column builder takes. */
export interface ColumnOptions extends LabelLanguageOptions {
  /** The column's display name. */
  displayName: LabelInput;
  /** The column's description. */
  description?: LabelInput;
  /** Whether a value is required. Default `"None"`. */
  requiredLevel?: ColumnRequiredLevel;
}

/** Options of a text column (`Metadata.string`). */
export interface StringColumnOptions extends ColumnOptions {
  /** The maximum length, 1 to 4,000. Default 100. */
  maxLength?: number;
  /** How the text is shown and checked, sent as `FormatName`. Default `"Text"`. */
  format?: StringFormat;
}

/** Options of a table's primary name column (`Metadata.primaryName`). */
export interface PrimaryNameColumnOptions extends ColumnOptions {
  /** The maximum length, 1 to 4,000. Default 100. */
  maxLength?: number;
}

/** Options of a multiline text column (`Metadata.memo`). */
export interface MemoColumnOptions extends ColumnOptions {
  /** The maximum length, 1 to 1,048,576. Default 2,000. */
  maxLength?: number;
}

/** Options of a whole number column (`Metadata.integer`). */
export interface IntegerColumnOptions extends ColumnOptions {
  /** The smallest value, from -2,147,483,648. */
  minValue?: number;
  /** The largest value, up to 2,147,483,647. */
  maxValue?: number;
  /** What the number means (`"Duration"`, `"TimeZone"`, `"Language"`, …). Default `"None"`. */
  format?: IntegerFormat;
}

/** Options of a decimal number column (`Metadata.decimal`). */
export interface DecimalColumnOptions extends ColumnOptions {
  /** Decimal places, 0 to 10. Default 2. */
  precision?: number;
  /** The smallest value, from -100,000,000,000. */
  minValue?: number;
  /** The largest value, up to 100,000,000,000. */
  maxValue?: number;
}

/** Options of a floating point number column (`Metadata.double`). */
export interface DoubleColumnOptions extends ColumnOptions {
  /** Decimal places, 0 to 5. Default 2. */
  precision?: number;
  /** The smallest value, from -100,000,000,000. */
  minValue?: number;
  /** The largest value, up to 100,000,000,000. */
  maxValue?: number;
}

/** Options of a currency column (`Metadata.money`). */
export interface MoneyColumnOptions extends ColumnOptions {
  /**
   * Decimal places: a number from 0 to 4, `"currency"` for the precision of the record's currency,
   * or `"pricing"` for the organization's pricing precision. Sent as `PrecisionSource` (and
   * `Precision` for a number). Default `"currency"`.
   */
  precision?: number | "currency" | "pricing";
  /** The smallest value, from -922,337,203,685,477. */
  minValue?: number;
  /** The largest value, up to 922,337,203,685,477. */
  maxValue?: number;
}

/** Options of a date and time column (`Metadata.dateTime`) that stores a time. */
export interface DateAndTimeColumnOptions extends ColumnOptions {
  /** A date and a time. The default. */
  format?: "DateAndTime";
  /**
   * How the value is stored: `"UserLocal"` (converted to UTC, the default) or
   * `"TimeZoneIndependent"` (stored as entered).
   */
  behavior?: "UserLocal" | "TimeZoneIndependent";
}

/** Options of a date and time column (`Metadata.dateTime`) that stores only a date. */
export interface DateOnlyColumnOptions extends ColumnOptions {
  /** A date, no time. */
  format: "DateOnly";
  /**
   * How the value is stored: `"UserLocal"` (the default), `"DateOnly"` (a date with no time zone)
   * or `"TimeZoneIndependent"`.
   */
  behavior?: "UserLocal" | "DateOnly" | "TimeZoneIndependent";
}

/**
 * Options of a date and time column (`Metadata.dateTime`). The `"DateOnly"` behavior needs the
 * `"DateOnly"` format.
 */
export type DateTimeColumnOptions = DateAndTimeColumnOptions | DateOnlyColumnOptions;

/** Options of a yes/no column (`Metadata.boolean`). */
export interface BooleanColumnOptions extends ColumnOptions {
  /** The label of the yes value (1). Default `"Yes"`. */
  trueLabel?: LabelInput;
  /** The label of the no value (0). Default `"No"`. */
  falseLabel?: LabelInput;
  /** The value a new record gets. Default `false`. */
  defaultValue?: boolean;
}

/** An option of a choice. */
export interface ChoiceOption {
  /** The option's label. */
  label: LabelInput;
  /**
   * The option's value. Leave it out and Dataverse assigns the next value from the publisher's
   * choice value prefix (e.g. 100000000).
   */
  value?: number;
  /** The option's description. */
  description?: LabelInput;
  /** A color for the option, e.g. `"#0000ff"`. */
  color?: string;
}

/** An option of a choice: its label, or a `ChoiceOption`. */
export type ChoiceOptionInput = string | ChoiceOption;

/** A choice column with options of its own (a local choice, created with the column). */
export interface LocalChoiceColumnOptions extends ColumnOptions {
  /** The options, at least one. */
  options: readonly ChoiceOptionInput[];
  globalOptionSetId?: never;
  /** The value a new record gets (`DefaultFormValue`). */
  defaultValue?: number;
}

/** A choice column that uses an existing global choice. */
export interface GlobalChoiceColumnOptions extends ColumnOptions {
  /**
   * The global choice's `MetadataId` (what `createGlobalOptionSet` returns, or
   * `getGlobalOptionSet(name, { select: ["MetadataId"] })`). Dataverse binds a global choice by
   * id only.
   */
  globalOptionSetId: string;
  options?: never;
  /** The value a new record gets (`DefaultFormValue`). */
  defaultValue?: number;
}

/**
 * Options of a choice or choices column (`Metadata.picklist`, `Metadata.multiSelectPicklist`):
 * its own `options` or a `globalOptionSetId`, exactly one of the two.
 */
export type ChoiceColumnOptions = LocalChoiceColumnOptions | GlobalChoiceColumnOptions;

/** Options of a file column (`Metadata.file`). */
export interface FileColumnOptions extends ColumnOptions {
  /** The largest file, in KB: 1 to 10,485,760 (10 GB). Default 32,768 (32 MB). */
  maxSizeInKB?: number;
}

/** Options of an image column (`Metadata.image`). */
export interface ImageColumnOptions extends ColumnOptions {
  /** The largest image, in KB: 1 to 30,720 (30 MB). Default 10,240 (10 MB). */
  maxSizeInKB?: number;
  /** Keep the full-size image as well as the thumbnail. Default `false`. */
  canStoreFullImage?: boolean;
}

/** Options of a lookup column and the 1:N relationship it is created with (`Metadata.lookup`). */
export interface LookupColumnOptions extends ColumnOptions {
  /** The table that gets the lookup column (the "many" side): `ReferencingEntity`. */
  referencingEntity: string;
  /** The table the lookup points to (the "one" side): `ReferencedEntity`. */
  referencedEntity: string;
  /** The relationship's schema name, with the customization prefix, e.g. `"new_account_project"`. */
  relationshipSchemaName: string;
  /** The referenced table's column the lookup holds. Default: its primary key. */
  referencedAttribute?: string;
  /**
   * What happens to the related rows when a row of the referenced table is assigned, deleted, …
   * Default: Dataverse's (`Delete: "RemoveLink"`, the others `"NoCascade"`).
   */
  cascade?: CascadeConfiguration;
}

/** Options of a table (`Metadata.entity`). */
export interface EntityDefinitionOptions extends LabelLanguageOptions {
  /** The table's display name, e.g. `"Project"`. */
  displayName: LabelInput;
  /** The table's plural display name, e.g. `"Projects"`. */
  displayCollectionName: LabelInput;
  /** The table's description. */
  description?: LabelInput;
  /**
   * Who owns the rows: a user or team (`"UserOwned"`, the default) or the organization
   * (`"OrganizationOwned"`). It can't be changed after the table is created.
   */
  ownershipType?: "UserOwned" | "OrganizationOwned";
  /** Whether activities can be related to the table's rows. Default `false`. */
  hasActivities?: boolean;
  /** Whether notes can be attached to the table's rows. Default `false`. */
  hasNotes?: boolean;
  /** The primary name column, from `Metadata.primaryName`. */
  primaryName: PrimaryNameAttributeMetadataCreate;
  /**
   * Other columns to create with the table. A lookup is created afterwards, with its
   * relationship (`Metadata.lookup` and `createOneToManyRelationship`).
   */
  attributes?: readonly AttributeMetadataCreateTypes[];
}

/** Options of a global choice (`Metadata.globalOptionSet`). */
export interface GlobalOptionSetOptions extends LabelLanguageOptions {
  /** The choice's display name. */
  displayName: LabelInput;
  /** The choice's description. */
  description?: LabelInput;
  /** The options, at least one. */
  options: readonly ChoiceOptionInput[];
}

/** Options of an N:N relationship (`Metadata.manyToMany`). */
export interface ManyToManyRelationshipOptions {
  /** The first table's logical name. */
  entity1LogicalName: string;
  /** The second table's logical name. */
  entity2LogicalName: string;
  /** The intersect table Dataverse creates. Default: the relationship's schema name, lowercased. */
  intersectEntityName?: string;
}

// ==================== The builders ====================

/**
 * The metadata builders, as `Metadata`. Each returns the create type a `MetadataClient` method
 * takes. Column builders take the column's schema name, with the customization prefix (e.g.
 * `"new_Code"`), and its options: `displayName` (required), `description`, `requiredLevel`
 * (default `"None"`) and `languageCode` (default 1033) for labels given as text.
 */
export interface MetadataBuilders {
  /**
   * A `Label` with its text in one language (default 1033), or in several.
   *
   * @example
   * ```typescript
   * Metadata.label("Name");
   * Metadata.label("Nom", 1036);
   * Metadata.label({ 1033: "Name", 1036: "Nom" });
   * ```
   */
  readonly label: {
    (text: string, languageCode?: number): Label;
    (texts: LabelTexts): Label;
  };

  /**
   * A table, for `createEntityDefinition`: its primary name column (from `Metadata.primaryName`)
   * first, then any other columns. Not an activity table. Lookups are created afterwards, with
   * their relationship (`Metadata.lookup`).
   *
   * @param schemaName The table's schema name, with the customization prefix, e.g. `"new_Project"`
   * @example
   * ```typescript
   * await metadata.createEntityDefinition(
   *   Metadata.entity("new_Project", {
   *     displayName: "Project",
   *     displayCollectionName: "Projects",
   *     primaryName: Metadata.primaryName("new_Name", { displayName: "Name" }),
   *     attributes: [Metadata.dateTime("new_DueDate", { displayName: "Due date", format: "DateOnly" })],
   *   })
   * );
   * ```
   */
  readonly entity: (schemaName: string, options: EntityDefinitionOptions) => EntityMetadataCreate;

  /**
   * The primary name column of a table, for `Metadata.entity`'s `primaryName`: a text column
   * with `IsPrimaryName: true` (`MaxLength` 100 by default).
   */
  readonly primaryName: (
    schemaName: string,
    options: PrimaryNameColumnOptions
  ) => PrimaryNameAttributeMetadataCreate;

  /**
   * A text column (`MaxLength` 100 and the `Text` format by default), for
   * `createAttributeDefinition` or `Metadata.entity`'s `attributes`.
   *
   * @example
   * ```typescript
   * await metadata.createAttributeDefinition(
   *   "new_project",
   *   Metadata.string("new_Code", { displayName: "Code", maxLength: 20 })
   * );
   * ```
   */
  readonly string: (
    schemaName: string,
    options: StringColumnOptions
  ) => StringAttributeMetadataCreate;

  /** A multiline text column (`MaxLength` 2,000 by default). */
  readonly memo: (schemaName: string, options: MemoColumnOptions) => MemoAttributeMetadataCreate;

  /** A whole number column (the `None` format by default). */
  readonly integer: (
    schemaName: string,
    options: IntegerColumnOptions
  ) => IntegerAttributeMetadataCreate;

  /** A decimal number column (2 decimal places by default). */
  readonly decimal: (
    schemaName: string,
    options: DecimalColumnOptions
  ) => DecimalAttributeMetadataCreate;

  /** A floating point number column (2 decimal places by default). */
  readonly double: (
    schemaName: string,
    options: DoubleColumnOptions
  ) => DoubleAttributeMetadataCreate;

  /** A currency column (the precision of the record's currency by default). */
  readonly money: (schemaName: string, options: MoneyColumnOptions) => MoneyAttributeMetadataCreate;

  /**
   * A date and time column (`DateAndTime` by default). The `"DateOnly"` behavior needs the
   * `"DateOnly"` format.
   *
   * @example
   * ```typescript
   * Metadata.dateTime("new_DueDate", { displayName: "Due date", format: "DateOnly", behavior: "DateOnly" });
   * ```
   */
  readonly dateTime: (
    schemaName: string,
    options: DateTimeColumnOptions
  ) => DateTimeAttributeMetadataCreate;

  /** A yes/no column, with its two options: Yes (1) and No (0) by default, default No. */
  readonly boolean: (
    schemaName: string,
    options: BooleanColumnOptions
  ) => BooleanAttributeMetadataCreate;

  /**
   * A choice column: its own `options` (a local choice, `IsGlobal: false`), or an existing global
   * choice by `globalOptionSetId`. Exactly one of the two.
   *
   * @example
   * ```typescript
   * Metadata.picklist("new_Size", { displayName: "Size", options: ["Small", "Large"] });
   * Metadata.picklist("new_Priority", { displayName: "Priority", globalOptionSetId: id });
   * ```
   */
  readonly picklist: (
    schemaName: string,
    options: ChoiceColumnOptions
  ) => PicklistAttributeMetadataCreate;

  /**
   * A choices (multi-select) column: its own `options` or an existing global choice by
   * `globalOptionSetId`, exactly one of the two.
   */
  readonly multiSelectPicklist: (
    schemaName: string,
    options: ChoiceColumnOptions
  ) => MultiSelectPicklistAttributeMetadataCreate;

  /** A file column (32 MB by default). */
  readonly file: (schemaName: string, options: FileColumnOptions) => FileAttributeMetadataCreate;

  /** An image column (10 MB, thumbnail only, by default). */
  readonly image: (schemaName: string, options: ImageColumnOptions) => ImageAttributeMetadataCreate;

  /**
   * A lookup column, as the 1:N relationship it is created with: pass the result to
   * `createOneToManyRelationship`. (Dataverse creates a lookup only through its relationship.)
   *
   * @param schemaName The lookup column's schema name, with the customization prefix, e.g.
   * `"new_AccountId"`
   * @example
   * ```typescript
   * await metadata.createOneToManyRelationship(
   *   Metadata.lookup("new_AccountId", {
   *     displayName: "Account",
   *     referencingEntity: "new_project", // gets the column
   *     referencedEntity: "account", // the table it points to
   *     relationshipSchemaName: "new_account_project",
   *   })
   * );
   * ```
   */
  readonly lookup: (
    schemaName: string,
    options: LookupColumnOptions
  ) => OneToManyRelationshipMetadataCreate;

  /**
   * An N:N relationship, for `createManyToManyRelationship`.
   *
   * @param schemaName The relationship's schema name, with the customization prefix
   */
  readonly manyToMany: (
    schemaName: string,
    options: ManyToManyRelationshipOptions
  ) => ManyToManyRelationshipMetadataCreate;

  /**
   * A global choice, for `createGlobalOptionSet`.
   *
   * @param name The choice's name, with the customization prefix, e.g. `"new_priority"`
   */
  readonly globalOptionSet: (
    name: string,
    options: GlobalOptionSetOptions
  ) => OptionSetMetadataCreate;
}

/**
 * Builders for the metadata create payloads (#345): `Metadata.entity`, `Metadata.string`,
 * `Metadata.picklist`, `Metadata.lookup`, … See {@link MetadataBuilders}.
 *
 * Each fills in the `@odata.type`, labels with their `LanguageCode`, `RequiredLevel` and
 * Dataverse's defaults, and throws `DataverseInvalidRequestError` (`InvalidParameter`) for input
 * Dataverse would reject. The result is an ordinary object of the create type: spread it to set a
 * property the builder doesn't take.
 *
 * @example
 * ```typescript
 * await metadata.createAttributeDefinition(
 *   "new_project",
 *   Metadata.picklist("new_Size", { displayName: "Size", options: ["Small", "Large"] })
 * );
 * ```
 */
export const Metadata: MetadataBuilders = {
  label,
  entity,
  primaryName,
  string,
  memo,
  integer,
  decimal,
  double,
  money,
  dateTime,
  boolean,
  picklist,
  multiSelectPicklist,
  file,
  image,
  lookup,
  manyToMany,
  globalOptionSet,
};

// ==================== Labels ====================

const DEFAULT_LANGUAGE = 1033;

function label(text: string, languageCode?: number): Label;
function label(texts: LabelTexts): Label;
function label(textOrTexts: string | LabelTexts, languageCode?: number): Label {
  if (typeof textOrTexts === "string") {
    return makeLabel([[textOrTexts, checkLanguage(languageCode ?? DEFAULT_LANGUAGE)]], "text");
  }
  if (languageCode !== undefined) {
    throw invalid("languageCode", "give the languages as the keys of the texts, not separately");
  }
  const entries = Object.entries(textOrTexts).map(([lcid, text]): [string, number] => [
    text,
    checkLanguage(Number(lcid)),
  ]);
  if (entries.length === 0) throw invalid("texts", "a label needs a text in at least one language");
  return makeLabel(entries, "texts");
}

function makeLabel(entries: ReadonlyArray<readonly [string, number]>, param: string): Label {
  for (const [text] of entries) {
    // unknown: JavaScript callers can pass anything
    const value: unknown = text;
    if (typeof value !== "string" || value.trim() === "") {
      throw invalid(param, "a label's text can't be empty");
    }
  }
  return {
    "@odata.type": "Microsoft.Dynamics.CRM.Label",
    LocalizedLabels: entries.map(([text, LanguageCode]) => ({
      "@odata.type": "Microsoft.Dynamics.CRM.LocalizedLabel",
      Label: text,
      LanguageCode,
    })),
  };
}

function checkLanguage(languageCode: number): number {
  if (!Number.isInteger(languageCode) || languageCode <= 0 || languageCode > 0xffff) {
    throw invalid(
      "languageCode",
      `${String(languageCode)} isn't a language code (LCID), e.g. 1033`
    );
  }
  return languageCode;
}

function toLabel(input: LabelInput, languageCode: number | undefined, param: string): Label {
  if (typeof input !== "string") return input;
  return makeLabel([[input, checkLanguage(languageCode ?? DEFAULT_LANGUAGE)]], param);
}

// ==================== Columns ====================

function string(schemaName: string, options: StringColumnOptions): StringAttributeMetadataCreate {
  return {
    ...column("StringAttributeMetadata", schemaName, options),
    MaxLength: checkRange("maxLength", options.maxLength ?? 100, 1, 4000, true),
    FormatName: { Value: options.format ?? "Text" },
  };
}

function primaryName(
  schemaName: string,
  options: PrimaryNameColumnOptions
): PrimaryNameAttributeMetadataCreate {
  return {
    ...column("StringAttributeMetadata", schemaName, options),
    IsPrimaryName: true,
    MaxLength: checkRange("maxLength", options.maxLength ?? 100, 1, 4000, true),
    FormatName: { Value: "Text" },
  };
}

function memo(schemaName: string, options: MemoColumnOptions): MemoAttributeMetadataCreate {
  return {
    ...column("MemoAttributeMetadata", schemaName, options),
    MaxLength: checkRange("maxLength", options.maxLength ?? 2000, 1, 1_048_576, true),
    Format: "TextArea",
  };
}

function integer(
  schemaName: string,
  options: IntegerColumnOptions
): IntegerAttributeMetadataCreate {
  return {
    ...column("IntegerAttributeMetadata", schemaName, options),
    Format: options.format ?? "None",
    ...minMax(options, -2_147_483_648, 2_147_483_647, true),
  };
}

function decimal(
  schemaName: string,
  options: DecimalColumnOptions
): DecimalAttributeMetadataCreate {
  return {
    ...column("DecimalAttributeMetadata", schemaName, options),
    Precision: checkRange("precision", options.precision ?? 2, 0, 10, true),
    ...minMax(options, -100_000_000_000, 100_000_000_000, false),
  };
}

function double(schemaName: string, options: DoubleColumnOptions): DoubleAttributeMetadataCreate {
  return {
    ...column("DoubleAttributeMetadata", schemaName, options),
    Precision: checkRange("precision", options.precision ?? 2, 0, 5, true),
    ...minMax(options, -100_000_000_000, 100_000_000_000, false),
  };
}

function money(schemaName: string, options: MoneyColumnOptions): MoneyAttributeMetadataCreate {
  const precision = options.precision ?? "currency";
  return {
    ...column("MoneyAttributeMetadata", schemaName, options),
    ...(precision === "currency"
      ? { PrecisionSource: 2 }
      : precision === "pricing"
        ? { PrecisionSource: 1 }
        : { PrecisionSource: 0, Precision: checkRange("precision", precision, 0, 4, true) }),
    ...minMax(options, -922_337_203_685_477, 922_337_203_685_477, false),
  };
}

function dateTime(
  schemaName: string,
  options: DateTimeColumnOptions
): DateTimeAttributeMetadataCreate {
  const format = options.format ?? "DateAndTime";
  if (options.behavior === "DateOnly" && format !== "DateOnly") {
    throw invalid("behavior", 'the "DateOnly" behavior needs the "DateOnly" format');
  }
  return {
    ...column("DateTimeAttributeMetadata", schemaName, options),
    Format: format,
    ...(options.behavior !== undefined && { DateTimeBehavior: { Value: options.behavior } }),
  };
}

function boolean(
  schemaName: string,
  options: BooleanColumnOptions
): BooleanAttributeMetadataCreate {
  const lang = options.languageCode;
  return {
    ...column("BooleanAttributeMetadata", schemaName, options),
    DefaultValue: options.defaultValue ?? false,
    OptionSet: {
      "@odata.type": "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata",
      OptionSetType: "Boolean",
      TrueOption: { Value: 1, Label: toLabel(options.trueLabel ?? "Yes", lang, "trueLabel") },
      FalseOption: { Value: 0, Label: toLabel(options.falseLabel ?? "No", lang, "falseLabel") },
    },
  };
}

function picklist(
  schemaName: string,
  options: ChoiceColumnOptions
): PicklistAttributeMetadataCreate {
  return {
    ...column("PicklistAttributeMetadata", schemaName, options),
    ...choice(options),
  };
}

function multiSelectPicklist(
  schemaName: string,
  options: ChoiceColumnOptions
): MultiSelectPicklistAttributeMetadataCreate {
  return {
    ...column("MultiSelectPicklistAttributeMetadata", schemaName, options),
    ...choice(options),
  };
}

function file(schemaName: string, options: FileColumnOptions): FileAttributeMetadataCreate {
  return {
    ...column("FileAttributeMetadata", schemaName, options),
    MaxSizeInKB: checkRange("maxSizeInKB", options.maxSizeInKB ?? 32_768, 1, 10_485_760, true),
  };
}

function image(schemaName: string, options: ImageColumnOptions): ImageAttributeMetadataCreate {
  return {
    ...column("ImageAttributeMetadata", schemaName, options),
    MaxSizeInKB: checkRange("maxSizeInKB", options.maxSizeInKB ?? 10_240, 1, 30_720, true),
    CanStoreFullImage: options.canStoreFullImage ?? false,
  };
}

// ==================== Relationships ====================

function lookup(
  schemaName: string,
  options: LookupColumnOptions
): OneToManyRelationshipMetadataCreate {
  return {
    "@odata.type": "Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata",
    SchemaName: checkSchemaName("relationshipSchemaName", options.relationshipSchemaName),
    ReferencedEntity: checkLogicalName("referencedEntity", options.referencedEntity),
    ReferencingEntity: checkLogicalName("referencingEntity", options.referencingEntity),
    ...(options.referencedAttribute !== undefined && {
      ReferencedAttribute: checkLogicalName("referencedAttribute", options.referencedAttribute),
    }),
    ...(options.cascade !== undefined && { CascadeConfiguration: options.cascade }),
    Lookup: column("LookupAttributeMetadata", schemaName, options),
  };
}

function manyToMany(
  schemaName: string,
  options: ManyToManyRelationshipOptions
): ManyToManyRelationshipMetadataCreate {
  const name = checkSchemaName("schemaName", schemaName);
  return {
    "@odata.type": "Microsoft.Dynamics.CRM.ManyToManyRelationshipMetadata",
    SchemaName: name,
    Entity1LogicalName: checkLogicalName("entity1LogicalName", options.entity1LogicalName),
    Entity2LogicalName: checkLogicalName("entity2LogicalName", options.entity2LogicalName),
    IntersectEntityName: checkSchemaName(
      "intersectEntityName",
      options.intersectEntityName ?? name.toLowerCase()
    ),
  };
}

// ==================== Tables and global choices ====================

function entity(schemaName: string, options: EntityDefinitionOptions): EntityMetadataCreate {
  const lang = options.languageCode;
  // For JavaScript callers and casts: the types already require these.
  if ((options.primaryName as { IsPrimaryName?: unknown }).IsPrimaryName !== true) {
    throw invalid("primaryName", "use Metadata.primaryName(...) for the primary name column");
  }
  const attributes = options.attributes ?? [];
  if (attributes.some((a) => (a as { IsPrimaryName?: unknown }).IsPrimaryName === true)) {
    throw invalid("attributes", "a table has one primary name column: pass it as primaryName");
  }
  return {
    "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata",
    SchemaName: checkSchemaName("schemaName", schemaName),
    DisplayName: toLabel(options.displayName, lang, "displayName"),
    DisplayCollectionName: toLabel(options.displayCollectionName, lang, "displayCollectionName"),
    ...(options.description !== undefined && {
      Description: toLabel(options.description, lang, "description"),
    }),
    OwnershipType: options.ownershipType ?? "UserOwned",
    IsActivity: false,
    HasActivities: options.hasActivities ?? false,
    HasNotes: options.hasNotes ?? false,
    Attributes: [options.primaryName, ...attributes],
  };
}

function globalOptionSet(name: string, options: GlobalOptionSetOptions): OptionSetMetadataCreate {
  const lang = options.languageCode;
  return {
    "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
    Name: checkSchemaName("name", name),
    DisplayName: toLabel(options.displayName, lang, "displayName"),
    ...(options.description !== undefined && {
      Description: toLabel(options.description, lang, "description"),
    }),
    IsGlobal: true,
    OptionSetType: "Picklist",
    Options: toOptions(options.options, lang),
  };
}

// ==================== Helpers ====================

/** The properties every column create has. */
interface ColumnBase<Name extends string> {
  "@odata.type": `Microsoft.Dynamics.CRM.${Name}`;
  SchemaName: string;
  DisplayName: Label;
  Description?: Label;
  RequiredLevel: { Value: ColumnRequiredLevel };
}

function column<Name extends string>(
  type: Name,
  schemaName: string,
  options: ColumnOptions
): ColumnBase<Name> {
  const lang = options.languageCode;
  const requiredLevel = options.requiredLevel ?? "None";
  if (!REQUIRED_LEVELS.includes(requiredLevel)) {
    throw invalid("requiredLevel", `use one of ${REQUIRED_LEVELS.join(", ")}`);
  }
  return {
    "@odata.type": `Microsoft.Dynamics.CRM.${type}`,
    SchemaName: checkSchemaName("schemaName", schemaName),
    DisplayName: toLabel(options.displayName, lang, "displayName"),
    ...(options.description !== undefined && {
      Description: toLabel(options.description, lang, "description"),
    }),
    RequiredLevel: { Value: requiredLevel },
  };
}

const REQUIRED_LEVELS: readonly string[] = ["None", "Recommended", "ApplicationRequired"];

type ChoicePart =
  | { OptionSet: LocalOptionSetMetadataCreate; DefaultFormValue?: number }
  | {
      "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${string})`;
      DefaultFormValue?: number;
    };

function choice(options: ChoiceColumnOptions): ChoicePart {
  const hasLocal = options.options !== undefined;
  const hasGlobal = options.globalOptionSetId !== undefined;
  if (hasLocal === hasGlobal) {
    throw invalid(
      "options",
      "give the column its own options or a globalOptionSetId, not both or neither"
    );
  }
  const defaultValue =
    options.defaultValue === undefined
      ? {}
      : {
          DefaultFormValue: checkRange(
            "defaultValue",
            options.defaultValue,
            -2_147_483_648,
            2_147_483_647,
            true
          ),
        };

  if (options.globalOptionSetId !== undefined) {
    const id = options.globalOptionSetId;
    if (!GUID.test(id)) {
      throw invalid(
        "globalOptionSetId",
        "use the global choice's MetadataId (a GUID); Dataverse binds by id only"
      );
    }
    return { "GlobalOptionSet@odata.bind": `/GlobalOptionSetDefinitions(${id})`, ...defaultValue };
  }

  const opts = toOptions(options.options, options.languageCode);
  if (
    options.defaultValue !== undefined &&
    opts.every((o) => o.Value !== undefined) &&
    !opts.some((o) => o.Value === options.defaultValue)
  ) {
    throw invalid(
      "defaultValue",
      `${String(options.defaultValue)} isn't one of the options' values`
    );
  }
  return {
    OptionSet: {
      "@odata.type": "Microsoft.Dynamics.CRM.OptionSetMetadata",
      IsGlobal: false,
      OptionSetType: "Picklist",
      Options: opts,
    },
    ...defaultValue,
  };
}

function toOptions(
  inputs: readonly ChoiceOptionInput[],
  languageCode: number | undefined
): OptionMetadataCreate[] {
  if (inputs.length === 0) throw invalid("options", "a choice needs at least one option");
  const seen = new Set<number>();
  return inputs.map((input, i): OptionMetadataCreate => {
    const o: ChoiceOption = typeof input === "string" ? { label: input } : input;
    const param = `options[${String(i)}]`;
    if (o.value !== undefined) {
      checkRange(`${param}.value`, o.value, -2_147_483_648, 2_147_483_647, true);
      if (seen.has(o.value)) throw invalid(`${param}.value`, `${String(o.value)} is used twice`);
      seen.add(o.value);
    }
    return {
      ...(o.value !== undefined && { Value: o.value }),
      Label: toLabel(o.label, languageCode, `${param}.label`),
      ...(o.description !== undefined && {
        Description: toLabel(o.description, languageCode, `${param}.description`),
      }),
      ...(o.color !== undefined && { Color: o.color }),
    };
  });
}

function minMax(
  options: { minValue?: number; maxValue?: number },
  lowest: number,
  highest: number,
  integerOnly: boolean
): { MinValue?: number; MaxValue?: number } {
  const { minValue, maxValue } = options;
  if (minValue !== undefined) checkRange("minValue", minValue, lowest, highest, integerOnly);
  if (maxValue !== undefined) checkRange("maxValue", maxValue, lowest, highest, integerOnly);
  if (minValue !== undefined && maxValue !== undefined && minValue > maxValue) {
    throw invalid("minValue", `${String(minValue)} is greater than maxValue ${String(maxValue)}`);
  }
  return {
    ...(minValue !== undefined && { MinValue: minValue }),
    ...(maxValue !== undefined && { MaxValue: maxValue }),
  };
}

function checkRange(
  param: string,
  value: number,
  lowest: number,
  highest: number,
  integerOnly: boolean
): number {
  // unknown: JavaScript callers can pass anything
  const n: unknown = value;
  if (
    typeof n !== "number" ||
    !Number.isFinite(n) ||
    (integerOnly && !Number.isInteger(n)) ||
    n < lowest ||
    n > highest
  ) {
    throw invalid(
      param,
      `${String(value)} must be ${integerOnly ? "a whole number" : "a number"} from ${String(lowest)} to ${String(highest)}`
    );
  }
  return value;
}

/** A customization prefix, an underscore, then letters, digits and underscores. */
const SCHEMA_NAME = /^[A-Za-z][A-Za-z0-9]*_[A-Za-z0-9_]+$/;
const LOGICAL_NAME = /^[A-Za-z][A-Za-z0-9_]*$/;
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function checkSchemaName(param: string, name: string): string {
  const value: unknown = name;
  if (typeof value !== "string" || !SCHEMA_NAME.test(value)) {
    throw invalid(
      param,
      `'${String(value)}' needs the customization prefix and only letters, digits and underscores, e.g. "new_Name"`
    );
  }
  return name;
}

function checkLogicalName(param: string, name: string): string {
  const value: unknown = name;
  if (typeof value !== "string" || !LOGICAL_NAME.test(value)) {
    throw invalid(param, `'${String(value)}' isn't a logical name, e.g. "account"`);
  }
  return name;
}

function invalid(param: string, reason: string): DataverseInvalidRequestError {
  return DataverseInvalidRequestError.invalidParameter(param, reason);
}
