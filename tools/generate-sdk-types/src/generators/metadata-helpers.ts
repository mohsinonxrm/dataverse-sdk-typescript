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
 *   relationship and option set creates, and the `Partial` update types. Their rules come from
 *   live checks: Dataverse rejects creates without `@odata.type` for columns, relationships and
 *   choices, and refuses abstract types (`AttributeMetadata`, `EnumAttributeMetadata`).
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
    content: `import type { ComplexLookupAttributeMetadata } from "./ComplexLookupAttributeMetadata.js";
import type { ComplexOneToManyRelationshipMetadata } from "./ComplexOneToManyRelationshipMetadata.js";
import type { Label } from "./Label.js";

/**
 * Parameters for InsertOptionValue action
 */
export interface InsertOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Label: Label;
  Value?: number;
  SolutionUniqueName?: string;
}

/**
 * Parameters for UpdateOptionValue action
 */
export interface UpdateOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Value: number;
  Label?: Label;
  Description?: Label;
  MergeLabels?: boolean;
}

/**
 * Parameters for DeleteOptionValue action
 */
export interface DeleteOptionValueParams {
  EntityLogicalName?: string;
  AttributeLogicalName?: string;
  Value: number;
}

/**
 * Parameters for OrderOption action
 */
export interface OrderOptionParams {
  EntityLogicalName: string;
  AttributeLogicalName: string;
  Values: number[];
  SolutionUniqueName?: string;
}

/**
 * Parameters for InsertStatusValue action
 */
export interface InsertStatusValueParams {
  EntityLogicalName: string;
  AttributeLogicalName: string;
  Label: Label;
  StateCode: number;
  Value?: number;
  SolutionUniqueName?: string;
}

/**
 * Lookup column of the polymorphic-lookup actions: a \`ComplexLookupAttributeMetadata\`
 * (\`Targets\`, \`Format\`, \`RequiredLevel\`, \`DisplayName\`, ...). The Web API reads the
 * \`@odata.type\` annotation when present.
 */
export type PolymorphicLookupAttributeInput = ComplexLookupAttributeMetadata & {
  "@odata.type"?: string;
};

/**
 * 1:N relationship of the polymorphic-lookup actions: a \`ComplexOneToManyRelationshipMetadata\`
 * (\`CascadeConfiguration\`, \`ReferencedAttribute\`, \`AssociatedMenuConfiguration\`, ...), one per
 * target table. \`SchemaName\`, \`ReferencedEntity\` and \`ReferencingEntity\` are required.
 */
export type PolymorphicOneToManyRelationshipInput = ComplexOneToManyRelationshipMetadata & {
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
} from "./AttributeMetadataCreateTypes.js";
import type { EntityMetadata } from "./EntityMetadata.js";

/** Table properties Dataverse computes; a create must not send them. */
export type ServerSetEntityProperty =
  | ServerSetMetadataProperty
  | "IsCustomEntity"
  | "IsIntersect"
  | "IsLogicalEntity"
  | "IsPrivate"
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
 * EntityMetadataCreate - the payload for creating a table: the server-set properties removed,
 * \`SchemaName\` required, and \`Attributes\` (which must include the primary name column) typed as
 * column create payloads. \`@odata.type\` is optional here: \`EntityDefinitions\` holds only
 * \`EntityMetadata\`, so Dataverse reads the body as that type without it. (Columns,
 * relationships and choices need it, and their create types require it.)
 */
export type EntityMetadataCreate = Omit<
  EntityMetadata,
  ServerSetEntityProperty | "@odata.type" | "SchemaName" | "Attributes"
> & {
  "@odata.type"?: MetadataODataType<"EntityMetadata">;
  SchemaName: string;
  Attributes?: AttributeMetadataCreateTypes[];
};
`,
  },
  {
    name: "EntityMetadataUpdate",
    content: `import type { EntityMetadataCreate } from "./EntityMetadataCreate.js";

/**
 * EntityMetadataUpdate - the payload for updating a table. Updates are \`PUT\`s that replace the
 * definition, so send the complete definition (a retrieved \`EntityMetadata\` is accepted), or use
 * \`mergeAndUpdateEntityDefinition\`.
 */
export type EntityMetadataUpdate = Partial<
  Omit<EntityMetadataCreate, "@odata.type" | "Attributes">
> & {
  "@odata.type"?: string;
};
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

/** The \`@odata.type\` of a metadata type in a payload: \`"Microsoft.Dynamics.CRM.<Name>"\`. */
export type MetadataODataType<Name extends string> = \`Microsoft.Dynamics.CRM.\${Name}\`;

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
 * A create payload for metadata type \`T\`: the server-set properties removed, and
 * \`@odata.type\` (as \`Microsoft.Dynamics.CRM.<Name>\`) and \`SchemaName\` required.
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
 * (\`createOneToManyRelationship\`), as the relationship's \`Lookup\`.
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
    content: `import type { OneToManyRelationshipMetadataCreate } from "./OneToManyRelationshipMetadataCreate.js";

/**
 * OneToManyRelationshipMetadataUpdate - the payload for updating a 1:N relationship. Updates are
 * \`PUT\`s that replace the definition, so send the complete definition.
 */
export type OneToManyRelationshipMetadataUpdate = Partial<
  Omit<OneToManyRelationshipMetadataCreate, "@odata.type" | "Lookup">
> & {
  "@odata.type"?: string;
};
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
    content: `import type { ManyToManyRelationshipMetadataCreate } from "./ManyToManyRelationshipMetadataCreate.js";

/**
 * ManyToManyRelationshipMetadataUpdate - the payload for updating an N:N relationship. Updates are
 * \`PUT\`s that replace the definition, so send the complete definition.
 */
export type ManyToManyRelationshipMetadataUpdate = Partial<
  Omit<ManyToManyRelationshipMetadataCreate, "@odata.type">
> & {
  "@odata.type"?: string;
};
`,
  },
  {
    name: "OptionSetMetadataCreate",
    content: `import type {
  MetadataODataType,
  ServerSetMetadataProperty,
} from "./AttributeMetadataCreateTypes.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * OptionSetMetadataCreate - the payload for creating a global choice: \`@odata.type\` and \`Name\`
 * are required.
 */
export type OptionSetMetadataCreate = Omit<
  OptionSetMetadata,
  ServerSetMetadataProperty | "IsCustomOptionSet" | "@odata.type" | "Name"
> & {
  "@odata.type": MetadataODataType<"OptionSetMetadata">;
  Name: string;
};
`,
  },
];
