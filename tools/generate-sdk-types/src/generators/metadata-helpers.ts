/**
 * Hand-written files of the metadata package: types the Web API needs that $metadata doesn't
 * describe. They are emitted verbatim, after the CSDL types, and are part of the index.
 *
 * - `RelationshipMetadataBase` and `OptionSetMetadataBase`: abstract bases that aren't in CSDL.
 *   Their enum-typed properties (`RelationshipType`, `SecurityTypes`, `OptionSetType`) use the
 *   generated string enums (#209).
 * - `metadata-params`: parameter shapes for the option-value and lookup actions.
 * - The create and update payloads (#171, #209): `*AttributeMetadataCreate` and the
 *   `AttributeMetadataCreateTypes` union discriminated on `@odata.type`, the table,
 *   relationship and option set creates. Their rules come from live checks: Dataverse rejects
 *   creates without `@odata.type` for columns, relationships and choices, and refuses abstract
 *   types (`AttributeMetadata`, `EnumAttributeMetadata`).
 * - The update payloads (#359): a metadata update is a `PUT` that replaces the definition, so
 *   `*Update` is the complete definition with `@odata.type` required, and `*Changes` is what the
 *   `mergeAndUpdate*` helpers take (they retrieve the rest).
 *
 * Edit these here, not in `packages/dataverse-sdk-metadata`: a regeneration overwrites that.
 */
export const METADATA_HELPER_FILES: ReadonlyArray<{ name: string; content: string }> = [
  {
    name: "RelationshipMetadataBase",
    content: `import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { MetadataBase } from "./MetadataBase.js";
import type { RelationshipType } from "./RelationshipType.js";
import type { SecurityTypes } from "./SecurityTypes.js";

/**
 * RelationshipMetadataBase - base interface for relationship metadata
 * (Not present in CSDL - manually maintained)
 */
export interface RelationshipMetadataBase extends MetadataBase {
  IsCustomRelationship?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsManaged?: boolean;
  IsValidForAdvancedFind?: boolean;
  SchemaName?: string;
  SecurityTypes?: SecurityTypes;
  RelationshipType?: RelationshipType;
  IntroducedVersion?: string;
}
`,
  },
  {
    name: "OptionSetMetadataBase",
    content: `import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { Label } from "./Label.js";
import type { MetadataBase } from "./MetadataBase.js";
import type { OptionSetType } from "./OptionSetType.js";

/**
 * OptionSetMetadataBase - base interface for option set metadata
 * (Not present in CSDL - manually maintained)
 */
export interface OptionSetMetadataBase extends MetadataBase {
  Description?: Label;
  DisplayName?: Label;
  IsCustomOptionSet?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsGlobal?: boolean;
  IsManaged?: boolean;
  Name?: string;
  OptionSetType?: OptionSetType;
  IntroducedVersion?: string;
  ExternalTypeName?: string;
}
`,
  },
  {
    name: "metadata-params",
    content: `import type {
  ServerSetAttributeProperty,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { ComplexOneToManyRelationshipMetadata } from "./ComplexOneToManyRelationshipMetadata.js";
import type { Label } from "./Label.js";

/**
 * A local choice: the choice column's table and column. Give this or \`OptionSetName\`, not both.
 */
export interface LocalOptionSetTarget {
  /** Logical name of the table with the choice column, e.g. \`"account"\`. */
  EntityLogicalName: string;
  /** Logical name of the choice column, e.g. \`"new_category"\`. */
  AttributeLogicalName: string;
  OptionSetName?: never;
}

/**
 * A global choice, by its \`Name\`. Give this or \`EntityLogicalName\` and
 * \`AttributeLogicalName\`, not both. A column bound to a global choice has no options of its own:
 * change the global choice.
 */
export interface GlobalOptionSetTarget {
  /** \`Name\` of the global choice, e.g. \`"new_colors"\`. */
  OptionSetName: string;
  EntityLogicalName?: never;
  AttributeLogicalName?: never;
}

/** The choice an option-value action changes: exactly one local or global choice. */
export type OptionSetTarget = LocalOptionSetTarget | GlobalOptionSetTarget;

/** Parameters for the InsertOptionValue action: a new option in a local or global choice. */
export type InsertOptionValueParams = OptionSetTarget & {
  Label: Label;
  /** The option's value. Dataverse picks the next one from the publisher's prefix if omitted. */
  Value?: number;
  Description?: Label;
  /** Color, as \`"#RRGGBB"\`. */
  Color?: string;
  ExternalValue?: string;
  IsHidden?: boolean;
  /** Values of the parent choice's options this option depends on. */
  ParentValues?: number[];
  SolutionUniqueName?: string;
};

/** Parameters for the UpdateOptionValue action: change an option of a local or global choice. */
export type UpdateOptionValueParams = OptionSetTarget & {
  /** The value of the option to change. */
  Value: number;
  /**
   * \`true\` keeps the labels of the languages \`Label\` and \`Description\` leave out; \`false\`
   * removes them. Required: \`$metadata\` marks it \`Nullable="false"\`.
   */
  MergeLabels: boolean;
  Label?: Label;
  Description?: Label;
  Color?: string;
  ExternalValue?: string;
  IsHidden?: boolean;
  ParentValues?: number[];
  SolutionUniqueName?: string;
};

/** Parameters for the DeleteOptionValue action: remove an option from a local or global choice. */
export type DeleteOptionValueParams = OptionSetTarget & {
  /** The value of the option to remove. */
  Value: number;
  SolutionUniqueName?: string;
};

/** Parameters for the OrderOption action: the new order of a local or global choice's options. */
export type OrderOptionParams = OptionSetTarget & {
  /** Every option value, in the new order. */
  Values: number[];
  SolutionUniqueName?: string;
};

/**
 * Parameters for the InsertStatusValue action: a new status reason (\`statuscode\` option) for a
 * state. Status reasons belong to one table's \`statuscode\` column, so the target is always that
 * column. (Dataverse accepts \`OptionSetName\` too, and then adds the option to that global
 * choice, which is no status column.)
 */
export type InsertStatusValueParams = LocalOptionSetTarget & {
  Label: Label;
  /** The state (\`statecode\` value) the status reason belongs to. */
  StateCode: number;
  Value?: number;
  Description?: Label;
  Color?: string;
  SolutionUniqueName?: string;
};

/**
 * Lookup column of the polymorphic-lookup actions: a \`ComplexLookupAttributeMetadata\`
 * (\`Targets\`, \`Format\`, \`RequiredLevel\`, \`DisplayName\`, ...) without the properties Dataverse
 * sets. The Web API reads the \`@odata.type\` annotation when present.
 */
export type PolymorphicLookupAttributeInput = Omit<
  ComplexLookupAttributeMetadata,
  ServerSetAttributeProperty
> & {
  "@odata.type"?: string;
};

/**
 * 1:N relationship of the polymorphic-lookup actions: a \`ComplexOneToManyRelationshipMetadata\`
 * (\`CascadeConfiguration\`, \`ReferencedAttribute\`, \`AssociatedMenuConfiguration\`, ...), one per
 * target table, without the properties Dataverse sets. \`SchemaName\`, \`ReferencedEntity\` and
 * \`ReferencingEntity\` are required.
 */
export type PolymorphicOneToManyRelationshipInput = Omit<
  ComplexOneToManyRelationshipMetadata,
  ServerSetMetadataProperty | "IsCustomRelationship" | "RelationshipType" | "ReferencingAttribute"
> & {
  "@odata.type"?: string;
  SchemaName: string;
  ReferencedEntity: string;
  ReferencingEntity: string;
};

/**
 * Parameters for CreateCustomerRelationships action
 * (\`Lookup\`, \`OneToManyRelationships\`, \`SolutionUniqueName\`, per the org's \`$metadata\`).
 */
export interface CreateCustomerRelationshipsParams {
  Lookup: PolymorphicLookupAttributeInput & { SchemaName: string };
  OneToManyRelationships: PolymorphicOneToManyRelationshipInput[];
  SolutionUniqueName?: string;
}

/**
 * Parameters for CreatePolymorphicLookupAttribute action
 * (\`Lookup\`, \`OneToManyRelationships\`, \`SolutionUniqueName\`, per the org's \`$metadata\`).
 */
export interface CreatePolymorphicLookupAttributeParams {
  Lookup: PolymorphicLookupAttributeInput & { SchemaName: string; DisplayName: Label };
  OneToManyRelationships: PolymorphicOneToManyRelationshipInput[];
  SolutionUniqueName?: string;
}
`,
  },
  {
    name: "EntityMetadataCreate",
    content: `import type {
  AttributeMetadataCreateTypes,
  MetadataODataType,
  ServerSetMetadataProperty,
  StringAttributeMetadataCreate,
} from "./AttributeMetadataCreateTypes.js";
import type { EntityMetadata } from "./EntityMetadata.js";
import type { Label } from "./Label.js";
import type { OwnershipTypes } from "./OwnershipTypes.js";

/**
 * Table properties Dataverse computes (read-only in the SDK's \`EntityMetadata\`, and ignored in a
 * create); a create must not send them.
 */
export type ServerSetEntityProperty =
  | ServerSetMetadataProperty
  | "CanTriggerWorkflow"
  | "IsAIRUpdated"
  | "IsChildEntity"
  | "IsCustomEntity"
  | "IsEnabledForCharts"
  | "IsEnabledForTrace"
  | "IsImportable"
  | "IsIntersect"
  | "IsLogicalEntity"
  | "IsOptimisticConcurrencyEnabled"
  | "IsPrivate"
  | "IsStateModelAware"
  | "LogicalCollectionName"
  | "ObjectTypeCode"
  | "OwnerId"
  | "OwnerIdType"
  | "OwningBusinessUnit"
  | "PrimaryIdAttribute"
  | "PrimaryImageAttribute"
  | "PrimaryNameAttribute"
  | "Privileges"
  | "RecurrenceBaseEntityLogicalName"
  | "ReportViewName"
  | "ManyToManyRelationships"
  | "ManyToOneRelationships"
  | "OneToManyRelationships"
  | "Keys";

/**
 * The primary name column of a table create: a text column (\`StringAttributeMetadata\`) with
 * \`IsPrimaryName: true\`. A table has exactly one, and it uses the \`Text\` format (the default).
 */
export interface PrimaryNameAttributeMetadataCreate extends Omit<
  StringAttributeMetadataCreate,
  "IsPrimaryName"
> {
  IsPrimaryName: true;
}

/**
 * Table properties a create must set: Dataverse rejects a table create without them
 * (Learn: "Create and update table definitions using the Web API").
 */
type RequiredEntityProperty =
  | "SchemaName"
  | "DisplayName"
  | "DisplayCollectionName"
  | "OwnershipType"
  | "IsActivity"
  | "HasActivities"
  | "HasNotes";

/**
 * EntityMetadataCreate - the payload for creating a table: the server-set properties removed, and
 * what Dataverse needs required: \`SchemaName\`, \`DisplayName\`, \`DisplayCollectionName\`,
 * \`OwnershipType\`, \`IsActivity\`, \`HasActivities\`, \`HasNotes\`, and \`Attributes\` with the
 * primary name column. \`Description\` is optional but recommended.
 *
 * \`Attributes\` is a tuple: the primary name column first (a text column with
 * \`IsPrimaryName: true\`), then any other columns, none of them a primary name. So a table always
 * has exactly one. A lookup column isn't created here: create the relationship
 * (\`createOneToManyRelationship\`) after the table.
 *
 * \`@odata.type\` is optional here: \`EntityDefinitions\` holds only \`EntityMetadata\`, so
 * Dataverse reads the body as that type without it. (Columns, relationships and choices need it,
 * and their create types require it.)
 */
export interface EntityMetadataCreate extends Omit<
  EntityMetadata,
  ServerSetEntityProperty | RequiredEntityProperty | "@odata.type" | "Attributes"
> {
  "@odata.type"?: MetadataODataType<"EntityMetadata">;
  /** With the publisher's customization prefix, e.g. \`"new_BankAccount"\`. */
  SchemaName: string;
  DisplayName: Label;
  DisplayCollectionName: Label;
  OwnershipType: OwnershipTypes;
  IsActivity: boolean;
  HasActivities: boolean;
  HasNotes: boolean;
  /** The primary name column first, then any other columns. */
  Attributes: [PrimaryNameAttributeMetadataCreate, ...AttributeMetadataCreateTypes[]];
}
`,
  },
  {
    name: "EntityMetadataUpdate",
    content: `import type { MetadataODataType } from "./AttributeMetadataCreateTypes.js";
import type { ServerSetEntityProperty } from "./EntityMetadataCreate.js";
import type { EntityMetadata } from "./EntityMetadata.js";

/**
 * EntityMetadataUpdate - the payload for updating a table: its complete definition, with
 * \`@odata.type\`. Updates are \`PUT\`s that replace the definition, so a property left out is
 * reset to its default. Retrieve the definition, change it and send all of it back
 * (\`{ ...retrieved, "@odata.type": "Microsoft.Dynamics.CRM.EntityMetadata" }\`), or use
 * \`mergeAndUpdateEntityDefinition\` with just the changes. Columns (\`Attributes\`) are updated
 * one by one, not through the table.
 */
export type EntityMetadataUpdate = Omit<
  EntityMetadata,
  ServerSetEntityProperty | "@odata.type" | "Attributes"
> & {
  "@odata.type": MetadataODataType<"EntityMetadata">;
};

/**
 * EntityMetadataChanges - the table properties to change with \`mergeAndUpdateEntityDefinition\`,
 * which retrieves the rest of the definition and sends it with them.
 */
export type EntityMetadataChanges = Partial<EntityMetadataUpdate>;
`,
  },
  {
    name: "AttributeMetadataCreateTypes",
    content: `import type { AttributeMetadata } from "./AttributeMetadata.js";
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

/** The \`@odata.type\` of a metadata type in a payload: \`"Microsoft.Dynamics.CRM.<Name>"\`. */
export type MetadataODataType<Name extends string> = \`Microsoft.Dynamics.CRM.\${Name}\`;

/** Properties Dataverse sets on every metadata component; a create must not send them. */
export type ServerSetMetadataProperty =
  "MetadataId" | "HasChanged" | "IsManaged" | "IntroducedVersion" | "CreatedOn" | "ModifiedOn";

/**
 * Attribute properties Dataverse computes (read-only in the SDK's \`AttributeMetadata\`, and
 * ignored in a create); a create must not send them. A column's type comes from \`@odata.type\`,
 * not \`AttributeType\`.
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
 * A create payload for metadata type \`T\`: the server-set properties (\`ServerSetAttributeProperty\`
 * and the type's own \`ServerSet\`) removed, and \`@odata.type\` (as \`Microsoft.Dynamics.CRM.<Name>\`)
 * and \`SchemaName\` required. \`IsPrimaryName\` can only be \`false\`: a table's primary name column
 * is created with the table (\`PrimaryNameAttributeMetadataCreate\` in \`EntityMetadataCreate\`).
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
 * The local choice a choice column creates with it (the column's \`OptionSet\`). Dataverse needs
 * \`IsGlobal: false\` ("IsGlobal is not specified" otherwise); \`@odata.type\` is optional, as the
 * property is declared as \`OptionSetMetadata\`.
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
 * An existing global choice to bind a column to, as \`"GlobalOptionSet@odata.bind"\`:
 * \`"/GlobalOptionSetDefinitions(<MetadataId>)"\`. Dataverse takes only the \`MetadataId\` here;
 * \`(Name='…')\` is rejected ("Guid should contain 32 digits"), so look the id up with
 * \`getGlobalOptionSet(name)\` or keep the one \`createGlobalOptionSet\` returns.
 */
export type GlobalOptionSetBind = \`/GlobalOptionSetDefinitions(\${string})\`;

/**
 * A choice (single or multi-select) column create. It has its own options (\`OptionSet\`, a local
 * choice created with the column) or uses an existing global choice
 * (\`"GlobalOptionSet@odata.bind"\`): exactly one of the two.
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
 * Create payload for a date and time column. \`MinSupportedValue\` and \`MaxSupportedValue\` are
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
 * Create payload for a choice column: its own options in \`OptionSet\`, or an existing global
 * choice in \`"GlobalOptionSet@odata.bind"\`.
 */
export type PicklistAttributeMetadataCreate = ChoiceAttributeMetadataCreate<
  PicklistAttributeMetadata,
  "PicklistAttributeMetadata",
  "ChildPicklistLogicalNames" | "SourceTypeMask"
>;
/**
 * Create payload for a choices (multi-select) column: its own options in \`OptionSet\`, or an
 * existing global choice in \`"GlobalOptionSet@odata.bind"\`.
 */
export type MultiSelectPicklistAttributeMetadataCreate = ChoiceAttributeMetadataCreate<
  MultiSelectPicklistAttributeMetadata,
  "MultiSelectPicklistAttributeMetadata",
  "ChildPicklistLogicalNames" | "SourceTypeMask"
>;
/**
 * Create payload for a lookup column. A lookup is created through its 1:N relationship
 * (\`createOneToManyRelationship\`), as the relationship's \`Lookup\`, so it is not one of the
 * \`AttributeMetadataCreateTypes\` that \`createAttributeDefinition\` takes.
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
 * \`@odata.type\`. Checking \`@odata.type\` narrows to the matching type:
 *
 * \`\`\`typescript
 * if (attr["@odata.type"] === "Microsoft.Dynamics.CRM.StringAttributeMetadata") attr.MaxLength;
 * \`\`\`
 *
 * The abstract \`AttributeMetadata\` and \`EnumAttributeMetadata\` are not included: Dataverse
 * rejects them ("Attribute of type AttributeMetadata cannot be created"). Nor is a lookup: it is
 * created with its relationship, as the \`Lookup\` of \`createOneToManyRelationship\`
 * (\`LookupAttributeMetadataCreate\`).
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
`,
  },
  {
    name: "OneToManyRelationshipMetadataCreate",
    content: `import type {
  LookupAttributeMetadataCreate,
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";

/**
 * OneToManyRelationshipMetadataCreate - the payload for creating a 1:N relationship and its
 * lookup column: \`@odata.type\`, \`SchemaName\`, both tables and the \`Lookup\` are required.
 */
export type OneToManyRelationshipMetadataCreate = Omit<
  OneToManyRelationshipMetadata,
  | ServerSetMetadataProperty
  | "IsCustomRelationship"
  | "RelationshipType"
  | "ReferencingAttribute"
  | "@odata.type"
  | "SchemaName"
  | "ReferencedEntity"
  | "ReferencingEntity"
  | "Lookup"
> & {
  "@odata.type": MetadataODataType<"OneToManyRelationshipMetadata">;
  SchemaName: string;
  /** The "one" (parent) table. */
  ReferencedEntity: string;
  /** The "many" (child) table, which gets the lookup column. */
  ReferencingEntity: string;
  /** The lookup column created on the referencing table. */
  Lookup: LookupAttributeMetadataCreate;
};
`,
  },
  {
    name: "OneToManyRelationshipMetadataUpdate",
    content: `import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ManyToManyRelationshipMetadataUpdate } from "./ManyToManyRelationshipMetadataUpdate.js";
import type { OneToManyRelationshipMetadata } from "./OneToManyRelationshipMetadata.js";

/**
 * OneToManyRelationshipMetadataUpdate - the payload for updating a 1:N relationship: its complete
 * definition, with \`@odata.type\`. Updates are \`PUT\`s that replace the definition, so a property
 * left out is reset to its default. Send the retrieved definition back with your changes, or use
 * \`mergeAndUpdateRelationship\`. The lookup column is updated as a column, not here.
 */
export type OneToManyRelationshipMetadataUpdate = Omit<
  OneToManyRelationshipMetadata,
  ServerSetMetadataProperty | "@odata.type" | "Lookup"
> & {
  "@odata.type": MetadataODataType<"OneToManyRelationshipMetadata">;
};

/** A complete 1:N or N:N relationship definition, told apart by \`@odata.type\`. */
export type RelationshipMetadataUpdateTypes =
  OneToManyRelationshipMetadataUpdate | ManyToManyRelationshipMetadataUpdate;

/**
 * RelationshipMetadataChanges - the relationship properties to change with
 * \`mergeAndUpdateRelationship\`, with the relationship's \`@odata.type\`
 * (\`OneToManyRelationshipMetadata\` or \`ManyToManyRelationshipMetadata\`), which the retrieve
 * casts to.
 */
export type RelationshipMetadataChanges =
  | (Partial<OneToManyRelationshipMetadataUpdate> &
      Pick<OneToManyRelationshipMetadataUpdate, "@odata.type">)
  | (Partial<ManyToManyRelationshipMetadataUpdate> &
      Pick<ManyToManyRelationshipMetadataUpdate, "@odata.type">);
`,
  },
  {
    name: "ManyToManyRelationshipMetadataCreate",
    content: `import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";

/**
 * ManyToManyRelationshipMetadataCreate - the payload for creating an N:N relationship:
 * \`@odata.type\`, \`SchemaName\`, both tables and the intersect table name are required.
 */
export type ManyToManyRelationshipMetadataCreate = Omit<
  ManyToManyRelationshipMetadata,
  | ServerSetMetadataProperty
  | "IsCustomRelationship"
  | "RelationshipType"
  | "Entity1IntersectAttribute"
  | "Entity2IntersectAttribute"
  | "@odata.type"
  | "SchemaName"
  | "Entity1LogicalName"
  | "Entity2LogicalName"
  | "IntersectEntityName"
> & {
  "@odata.type": MetadataODataType<"ManyToManyRelationshipMetadata">;
  SchemaName: string;
  Entity1LogicalName: string;
  Entity2LogicalName: string;
  IntersectEntityName: string;
};
`,
  },
  {
    name: "ManyToManyRelationshipMetadataUpdate",
    content: `import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { ManyToManyRelationshipMetadata } from "./ManyToManyRelationshipMetadata.js";

/**
 * ManyToManyRelationshipMetadataUpdate - the payload for updating an N:N relationship: its
 * complete definition, with \`@odata.type\`. Updates are \`PUT\`s that replace the definition, so a
 * property left out is reset to its default. Send the retrieved definition back with your
 * changes, or use \`mergeAndUpdateRelationship\`.
 */
export type ManyToManyRelationshipMetadataUpdate = Omit<
  ManyToManyRelationshipMetadata,
  ServerSetMetadataProperty | "@odata.type"
> & {
  "@odata.type": MetadataODataType<"ManyToManyRelationshipMetadata">;
};
`,
  },
  {
    name: "OptionSetMetadataCreate",
    content: `import type {
  MetadataODataType,
  OptionMetadataCreate,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * OptionSetMetadataCreate - the payload for creating a global choice: \`@odata.type\` and \`Name\`
 * are required.
 */
export type OptionSetMetadataCreate = Omit<
  OptionSetMetadata,
  ServerSetMetadataProperty | "IsCustomOptionSet" | "@odata.type" | "Name" | "Options"
> & {
  "@odata.type": MetadataODataType<"OptionSetMetadata">;
  Name: string;
  Options?: OptionMetadataCreate[];
};
`,
  },
  {
    name: "OptionSetMetadataUpdate",
    content: `import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * OptionSetMetadataUpdate - the payload for updating a global choice: its complete definition,
 * with \`@odata.type\`. Updates are \`PUT\`s that replace the definition, so a property left out is
 * reset to its default. Send the retrieved definition back with your changes, or use
 * \`mergeAndUpdateGlobalOptionSet\`. A \`PUT\` doesn't change the options (\`Options\`): use
 * \`insertOptionValue\`, \`updateOptionValue\`, \`deleteOptionValue\` and \`orderOptions\`.
 */
export type OptionSetMetadataUpdate = Omit<
  OptionSetMetadata,
  ServerSetMetadataProperty | "IsCustomOptionSet" | "@odata.type" | "Options"
> & {
  "@odata.type": MetadataODataType<"OptionSetMetadata">;
};

/**
 * OptionSetMetadataChanges - the global choice properties to change with
 * \`mergeAndUpdateGlobalOptionSet\`, which retrieves the rest of the definition and sends it with
 * them.
 */
export type OptionSetMetadataChanges = Partial<OptionSetMetadataUpdate>;
`,
  },
  {
    name: "AttributeMetadataUpdateTypes",
    content: `import type {
  MetadataODataType,
  ServerSetAttributeProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BigIntAttributeMetadata } from "./BigIntAttributeMetadata.js";
import type { BooleanAttributeMetadata } from "./BooleanAttributeMetadata.js";
import type { DateTimeAttributeMetadata } from "./DateTimeAttributeMetadata.js";
import type { DecimalAttributeMetadata } from "./DecimalAttributeMetadata.js";
import type { DoubleAttributeMetadata } from "./DoubleAttributeMetadata.js";
import type { EntityNameAttributeMetadata } from "./EntityNameAttributeMetadata.js";
import type { FileAttributeMetadata } from "./FileAttributeMetadata.js";
import type { ImageAttributeMetadata } from "./ImageAttributeMetadata.js";
import type { IntegerAttributeMetadata } from "./IntegerAttributeMetadata.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { ManagedPropertyAttributeMetadata } from "./ManagedPropertyAttributeMetadata.js";
import type { MemoAttributeMetadata } from "./MemoAttributeMetadata.js";
import type { MoneyAttributeMetadata } from "./MoneyAttributeMetadata.js";
import type { MultiSelectPicklistAttributeMetadata } from "./MultiSelectPicklistAttributeMetadata.js";
import type { PicklistAttributeMetadata } from "./PicklistAttributeMetadata.js";
import type { StateAttributeMetadata } from "./StateAttributeMetadata.js";
import type { StatusAttributeMetadata } from "./StatusAttributeMetadata.js";
import type { StringAttributeMetadata } from "./StringAttributeMetadata.js";
import type { UniqueIdentifierAttributeMetadata } from "./UniqueIdentifierAttributeMetadata.js";

/**
 * An update payload for column type \`T\`: its complete definition, with \`@odata.type\` (as
 * \`Microsoft.Dynamics.CRM.<Name>\`) required. The properties Dataverse computes
 * (\`ServerSetAttributeProperty\` and the type's own \`ServerSet\`) are left out; a retrieved
 * definition that has them can still be sent back.
 */
export type AttributeMetadataUpdate<
  T extends AttributeMetadata,
  Name extends string,
  ServerSet extends string = never,
> = Omit<T, ServerSetAttributeProperty | ServerSet | "@odata.type"> & {
  "@odata.type": MetadataODataType<Name>;
};

/** The update payload of each column type, by the type's name. */
export interface AttributeMetadataUpdateByType {
  BigIntAttributeMetadata: AttributeMetadataUpdate<
    BigIntAttributeMetadata,
    "BigIntAttributeMetadata"
  >;
  BooleanAttributeMetadata: AttributeMetadataUpdate<
    BooleanAttributeMetadata,
    "BooleanAttributeMetadata"
  >;
  DateTimeAttributeMetadata: AttributeMetadataUpdate<
    DateTimeAttributeMetadata,
    "DateTimeAttributeMetadata",
    "MaxSupportedValue" | "MinSupportedValue"
  >;
  DecimalAttributeMetadata: AttributeMetadataUpdate<
    DecimalAttributeMetadata,
    "DecimalAttributeMetadata"
  >;
  DoubleAttributeMetadata: AttributeMetadataUpdate<
    DoubleAttributeMetadata,
    "DoubleAttributeMetadata"
  >;
  EntityNameAttributeMetadata: AttributeMetadataUpdate<
    EntityNameAttributeMetadata,
    "EntityNameAttributeMetadata",
    "IsEntityReferenceStored"
  >;
  FileAttributeMetadata: AttributeMetadataUpdate<FileAttributeMetadata, "FileAttributeMetadata">;
  ImageAttributeMetadata: AttributeMetadataUpdate<ImageAttributeMetadata, "ImageAttributeMetadata">;
  IntegerAttributeMetadata: AttributeMetadataUpdate<
    IntegerAttributeMetadata,
    "IntegerAttributeMetadata"
  >;
  LookupAttributeMetadata: AttributeMetadataUpdate<
    LookupAttributeMetadata,
    "LookupAttributeMetadata"
  >;
  ManagedPropertyAttributeMetadata: AttributeMetadataUpdate<
    ManagedPropertyAttributeMetadata,
    "ManagedPropertyAttributeMetadata",
    "ValueAttributeTypeCode"
  >;
  MemoAttributeMetadata: AttributeMetadataUpdate<MemoAttributeMetadata, "MemoAttributeMetadata">;
  MoneyAttributeMetadata: AttributeMetadataUpdate<MoneyAttributeMetadata, "MoneyAttributeMetadata">;
  MultiSelectPicklistAttributeMetadata: AttributeMetadataUpdate<
    MultiSelectPicklistAttributeMetadata,
    "MultiSelectPicklistAttributeMetadata"
  >;
  PicklistAttributeMetadata: AttributeMetadataUpdate<
    PicklistAttributeMetadata,
    "PicklistAttributeMetadata"
  >;
  StateAttributeMetadata: AttributeMetadataUpdate<StateAttributeMetadata, "StateAttributeMetadata">;
  StatusAttributeMetadata: AttributeMetadataUpdate<
    StatusAttributeMetadata,
    "StatusAttributeMetadata"
  >;
  StringAttributeMetadata: AttributeMetadataUpdate<
    StringAttributeMetadata,
    "StringAttributeMetadata"
  >;
  UniqueIdentifierAttributeMetadata: AttributeMetadataUpdate<
    UniqueIdentifierAttributeMetadata,
    "UniqueIdentifierAttributeMetadata"
  >;
}

/**
 * AttributeMetadataUpdateTypes - the payload for updating a column: its complete definition, as a
 * union discriminated on \`@odata.type\`. Updates are \`PUT\`s that replace the definition, so a
 * property left out is reset to its default. Retrieve the column cast to its type, change it and
 * send all of it back, or use \`mergeAndUpdateAttributeDefinition\`. The abstract
 * \`AttributeMetadata\` and \`EnumAttributeMetadata\` are not column types and are not included.
 */
export type AttributeMetadataUpdateTypes =
  AttributeMetadataUpdateByType[keyof AttributeMetadataUpdateByType];

/**
 * AttributeMetadataChanges - the column properties to change with
 * \`mergeAndUpdateAttributeDefinition\`, with the column's \`@odata.type\`, which the retrieve
 * casts to. The rest of the definition is retrieved and sent with them.
 */
export type AttributeMetadataChanges = {
  [Name in keyof AttributeMetadataUpdateByType]: Partial<AttributeMetadataUpdateByType[Name]> &
    Pick<AttributeMetadataUpdateByType[Name], "@odata.type">;
}[keyof AttributeMetadataUpdateByType];
`,
  },
];
