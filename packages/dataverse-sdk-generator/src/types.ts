/**
 * Portions of this file are adapted from dataverse-gen by Scott Durow
 * (https://github.com/scottdurow/dataverse-gen), Copyright (c) 2020 Scott Durow, licensed under
 * the MIT License. See THIRD_PARTY_NOTICES.md in this package for the notice.
 */

import type { ApiVersion } from "@mohsinonxrm/dataverse-sdk-core";
import type {
  AttributeSourceType,
  AttributeTypeCode,
  DateTimeBehaviorValue,
  DateTimeFormat,
} from "@mohsinonxrm/dataverse-sdk-metadata";

/**
 * Configuration for the Dataverse code generator.
 */
export interface DataverseGenConfig {
  /**
   * Dataverse environment URL (e.g., "https://org.crm.dynamics.com")
   */
  environmentUrl: string;

  /**
   * API version to use (default: "v9.2")
   */
  apiVersion?: ApiVersion;

  /**
   * Entity logical names to generate (empty array = all entities)
   */
  entities?: string[];

  /**
   * Action names to generate (empty array = all actions)
   */
  actions?: string[];

  /**
   * Function names to generate (empty array = all functions)
   */
  functions?: string[];

  /**
   * Output configuration
   */
  output?: {
    /**
     * Root directory for generated code (default: "./generated")
     */
    outputRoot?: string;

    /**
     * Generate index barrel exports (default: true)
     */
    generateIndex?: boolean;

    /**
     * File suffix for generated files (default: "")
     * Example: ".generated" → "Account.generated.ts"
     */
    fileSuffix?: string;

    /**
     * Regenerate only the tables whose metadata changed (default: `false`). A stamp file in the
     * output folder (`.dataverse-gen-stamp.json`) records a hash of each table and of the
     * settings; a table whose hash is unchanged keeps its files as they are. A change of
     * options, templates, generator version or of the set of generated types regenerates every
     * table. Files the previous run wrote that this one doesn't are removed. Metadata is still
     * read in full.
     */
    incremental?: boolean;
  };

  /**
   * A directory of custom EJS templates (default: none). A template there (`entity.ejs`,
   * `enum.ejs`, …) is used instead of the built-in one of the same name; the others stay built-in.
   * `dataverse-gen eject` copies the built-in templates into a directory to start from. A relative
   * path is resolved against the working directory.
   */
  templates?: string;

  /**
   * Type operation responses exactly as `$metadata` declares them (default: `false`; the CLI's
   * `--strict-nulls` turns it on).
   *
   * Every complex type an operation returns, directly or nested in another complex type, also
   * gets an `<Name>Output` interface: every property is present, and is `T | null` unless the CSDL
   * declares it `Nullable="false"` (then it's `T`). `<Class>Response` and the nested properties
   * use it. A primitive or complex return the CSDL leaves nullable is `T | null`, and so are the
   * items of a nullable collection return of primitives, enums or complex types.
   *
   * Parameters don't change: they keep the `<Name>` interfaces, whose properties are optional, so
   * a caller sends only what it sets. Entity returns are `Record | null` either way.
   */
  strictNulls?: boolean;

  /**
   * Generate typed form contexts for model-driven form scripts (default: `false`): a
   * `forms/<Entity>Form.ts` per table with `<Entity>Attributes`, `<Entity>Controls` and
   * `<Entity>FormContext`, whose `getAttribute()` and `getControl()` take a column's logical name
   * and return its `Xrm.Attributes` / `Xrm.Controls` type. The files use the global `Xrm`
   * namespace of `@types/xrm`, which the app then needs.
   */
  formContext?: boolean;

  /**
   * Generate typed request builders per entity set (default: `false`, #312): `client.ts` with
   * `createTypedClient(client)`, which returns one `EntitySetClient` per generated table, keyed by
   * entity set name: `typed.accounts.byId(id).get({ select: ["name"] })`, `.list()`,
   * `.create()`, `.byId(id).update()`, `.byId(id).delete()`, typed by the table's interface, its
   * create and update types, a union of its column names (`AccountColumn`, for `select`, which
   * narrows the result) and its navigation properties (`AccountNavigation`, for `expand`, #431).
   */
  typedClient?: boolean;

  /**
   * MSAL authentication for metadata retrieval (used by `dataverse-gen generate`).
   * `--token` on the command line takes precedence.
   */
  auth?: DataverseGenAuthConfig;
}

/**
 * How `dataverse-gen` signs in to read metadata. Values left out are read from the
 * `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID` and `DATAVERSE_CLIENT_SECRET` environment
 * variables, so the config file can be committed without them.
 */
export interface DataverseGenAuthConfig {
  /**
   * Authentication flow:
   * - `"deviceCode"`: sign in as a user with a code shown in the terminal (public client app);
   * - `"clientCredentials"` (or `"clientSecret"`): an app registration with a client secret,
   *   added to the org as an application user.
   *
   * `"interactive"` is not supported; use `"deviceCode"`.
   */
  flow: "deviceCode" | "clientCredentials" | "clientSecret" | "interactive";

  /** Microsoft Entra tenant ID (default: `DATAVERSE_TENANT_ID`) */
  tenantId?: string;

  /** App registration (client) ID (default: `DATAVERSE_CLIENT_ID`) */
  clientId?: string;

  /**
   * Client secret, for client credentials (default: `DATAVERSE_CLIENT_SECRET`). Prefer the
   * environment variable to keep the secret out of the config file.
   */
  clientSecret?: string;

  /**
   * Authority URL (default: `https://login.microsoftonline.com/<tenantId>`). Set it for a
   * sovereign cloud, e.g. `https://login.microsoftonline.us/<tenantId>`.
   */
  authority?: string;
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Partial<DataverseGenConfig> = {
  apiVersion: "v9.2",
  entities: [],
  actions: [],
  functions: [],
  output: {
    outputRoot: "./generated",
    generateIndex: true,
    fileSuffix: "",
  },
  strictNulls: false,
};

/**
 * Represents an entity type from CSDL metadata
 */
export interface EntityType {
  /** Schema name (e.g., "Account") */
  Name: string;

  /** Schema name (PascalCase, from RetrieveMetadataChanges) */
  SchemaName?: string;

  /** OData type name (e.g., "Microsoft.Dynamics.CRM.account") */
  TypeName: string;

  /** Logical name (lowercase, e.g., "account") */
  LogicalName: string;

  /** Entity set name (e.g., "accounts") */
  EntitySetName: string;

  /** Primary key attribute name */
  KeyName: string;

  /** Primary name attribute */
  PrimaryNameAttribute?: string;

  /** Entity properties/attributes */
  Properties: PropertyType[];

  /** Navigation properties */
  NavigationProperties: NavigationPropertyType[];

  /** Alternate keys */
  Keys?: EntityKeyType[];

  /** Is this a custom entity? */
  IsCustomEntity: boolean;
}

/**
 * Represents an alternate key
 */
export interface EntityKeyType {
  LogicalName?: string;
  SchemaName?: string;
  DisplayName?: string;
  KeyAttributes?: string[];
  EntityLogicalName?: string;
  MetadataId?: string;
}

/**
 * Represents a property/attribute on an entity
 */
export interface PropertyType {
  /** Property name (attribute logical name) */
  Name: string;

  /** Schema name (PascalCase, from metadata) */
  SchemaName?: string;

  /** Logical name (lowercase) */
  LogicalName: string;

  /** Dataverse/OData type */
  Type: string;

  /** Dataverse attribute type from RetrieveMetadataChanges (e.g. "Lookup", "Picklist") */
  AttributeType?: AttributeTypeCode | (string & {});

  /** TypeScript type */
  TypeScriptType: TypeScriptType;

  /** Is this nullable? */
  Nullable?: boolean;

  /** Is this read-only? */
  IsReadOnly?: boolean;

  /**
   * The column can be set in a create (`IsValidForCreate` from RetrieveMetadataChanges). Unset
   * for a property with no column of its own, such as a lookup's `_<name>_value`.
   */
  IsValidForCreate?: boolean;

  /** The column can be set in an update (`IsValidForUpdate` from RetrieveMetadataChanges). */
  IsValidForUpdate?: boolean;

  /** Business-required: a caller must supply a value (`RequiredLevel` is ApplicationRequired). */
  IsRequired?: boolean;

  /** The column's `RequiredLevel` when it isn't None: SystemRequired, ApplicationRequired or Recommended. */
  RequiredLevel?: "SystemRequired" | "ApplicationRequired" | "Recommended";

  /** Is this the primary key? */
  IsPrimaryKey?: boolean;

  /** For lookup attributes: target entity types */
  Targets?: string[];

  /** For option set attributes: is this an enum? */
  IsEnum?: boolean;

  /** For option set attributes: enum type name */
  EnumName?: string;

  /** For option set attributes: enum type (deprecated, use EnumName) */
  OptionSetType?: string;

  /** Is this a multi-select option set? */
  IsMultiSelect?: boolean;

  /** Most characters a text column holds (`MaxLength`). */
  MaxLength?: number;

  /** Smallest value a number column takes (`MinValue`). */
  MinValue?: number;

  /** Largest value a number column takes (`MaxValue`). */
  MaxValue?: number;

  /** The values of a choice or choices column's options, in order. */
  OptionValues?: number[];

  /** Source type (`AttributeSourceType`): 0=simple, 1=calculated, 2=rollup, 3=formula, 4=prompt */
  SourceType?: AttributeSourceType | (number & {});

  /** Attribute this extends (for virtual attributes) */
  AttributeOf?: string;

  /** Display name (localized) */
  DisplayName?: string;

  /** Description (localized) */
  Description?: string;

  /** Date/time column: its `DateTimeBehavior`, else its `Format` */
  Format?: DateTimeBehaviorValue | DateTimeFormat | (string & {});

  /**
   * A complex type's navigation property (`PrincipalAccess.Principal`, #361): an entity, or a
   * collection of them, set with a reference or a record.
   */
  IsNavigation?: boolean;
}

/**
 * Represents a navigation property
 */
export interface NavigationPropertyType {
  /** Navigation property name */
  Name: string;

  /** Full navigation property name (before code-safe conversion) */
  FullName?: string;

  /** Target entity type(s) - comma-separated for polymorphic */
  TargetType: string;

  /** For polymorphic lookups: array of target entity types */
  Targets?: string[];

  /** Is this a polymorphic lookup? */
  IsPolymorphic?: boolean;

  /**
   * For a polymorphic lookup consolidated into one property (`parentcustomerid`): the
   * single-valued navigation properties of the CSDL it stands for, one per target
   * (`parentcustomerid_account`, `parentcustomerid_contact`). The Web API expands those.
   */
  Members?: Array<{ Name: string; TargetType: string }>;

  /** Is this a collection? */
  IsCollection: boolean;

  /** Relationship schema name */
  RelationshipName: string;

  /** Referenced property (for single lookups) */
  ReferencedProperty?: string;

  /** Referencing property (for reverse lookups) */
  ReferencingProperty?: string;

  /** TypeScript type (used in templates) */
  Type?: string;

  /**
   * The lookup property the CSDL constrains this navigation property with (`_primarycontactid_value`),
   * from its `ReferentialConstraint`.
   */
  ReferentialProperty?: string;

  /**
   * For the navigation property a lookup column is written through (`primarycontactid`,
   * `contoso_ParentAccountId`, the consolidated `customerid`): the lookup's logical name.
   */
  LookupAttribute?: string;

  /** The tables {@link LookupAttribute} can point to (its `Targets`), e.g. `["systemuser", "team"]`. */
  LookupTargets?: string[];

  /** The lookup can be set in a create (`IsValidForCreate` of {@link LookupAttribute}). */
  IsValidForCreate?: boolean;

  /** The lookup can be set in an update (`IsValidForUpdate` of {@link LookupAttribute}). */
  IsValidForUpdate?: boolean;

  /** The lookup's `RequiredLevel` when it isn't None. */
  RequiredLevel?: "SystemRequired" | "ApplicationRequired" | "Recommended";
}

/**
 * Represents an enum type from CSDL
 */
export interface EnumType {
  /** Enum name */
  Name: string;

  /** Enum members */
  Members: EnumMember[];

  /** Is this a global option set? */
  IsGlobal: boolean;

  /** A CSDL enum with `IsFlags="true"`: a value can combine members (`ReadAccess, WriteAccess`). */
  IsFlags?: boolean;

  /**
   * An `EnumType` of the CSDL (`AccessRights`) that isn't a choice column's option set. Its members
   * are generated with their names as values, which the Web API reads and writes (#479); a flags
   * enum keeps its numbers, which combine with `|`. An option set (local, or a `$metadata` enum a
   * choice column uses) keeps its numbers, which Dataverse stores.
   */
  IsCsdlEnum?: boolean;
}

/**
 * Enum member
 */
export interface EnumMember {
  /** Member name */
  Name: string;

  /** Member value */
  Value: number;
}

/**
 * Represents an action from CSDL
 */
export interface ActionType {
  /** Action name */
  Name: string;

  /** Is this bound to an entity? */
  IsBound: boolean;

  /** Binding parameter type (if bound) */
  BindingType?: string;

  /** Entity type the operation is bound to, without the namespace (e.g. "account") */
  BindingEntity?: string;

  /** Bound to the entity collection (`Collection(mscrm.account)`) rather than to one record */
  IsCollectionBound?: boolean;

  /** Entity set of the binding entity type, when it has one (e.g. "accounts") */
  BindingEntitySetName?: string;

  /** Parameters */
  Parameters: ParameterType[];

  /** Return type */
  ReturnType?: TypeScriptType;

  /**
   * Whether the CSDL leaves the return nullable (no `Nullable="false"` on `ReturnType`). For a
   * collection it applies to the items. Only `strictNulls` reads it.
   */
  ReturnTypeNullable?: boolean;
}

/**
 * Represents a function from CSDL
 */
export interface FunctionType {
  /** Function name */
  Name: string;

  /** Is this bound to an entity? */
  IsBound: boolean;

  /** Binding parameter type (if bound) */
  BindingType?: string;

  /** Entity type the operation is bound to, without the namespace (e.g. "account") */
  BindingEntity?: string;

  /** Bound to the entity collection (`Collection(mscrm.account)`) rather than to one record */
  IsCollectionBound?: boolean;

  /** Entity set of the binding entity type, when it has one (e.g. "accounts") */
  BindingEntitySetName?: string;

  /** Parameters */
  Parameters: ParameterType[];

  /** Return type */
  ReturnType?: TypeScriptType;

  /**
   * Whether the CSDL leaves the return nullable (no `Nullable="false"` on `ReturnType`). For a
   * collection it applies to the items. Only `strictNulls` reads it.
   */
  ReturnTypeNullable?: boolean;

  /** Is composable? */
  IsComposable?: boolean;
}

/**
 * Parameter for action/function
 */
export interface ParameterType {
  /** Parameter name */
  Name: string;

  /** Dataverse/OData type */
  Type: string;

  /** TypeScript type */
  TypeScriptType: TypeScriptType;

  /** Is nullable? */
  Nullable?: boolean;
}

/**
 * Represents a complex type from CSDL
 */
export interface ComplexType {
  /** Type name */
  Name: string;

  /** Base complex type name, if this type derives from another one */
  BaseType?: string;

  /** Properties */
  Properties: PropertyType[];
}

/**
 * TypeScript type representation with import info
 */
export interface TypeScriptType {
  /** Type name in TypeScript */
  name: string;

  /**
   * Name of the referenced entity, complex or enum type in the Dataverse schema (without the
   * namespace), when this is not a primitive type. The generator resolves it to an import.
   */
  reference?: string;

  /** Import path (if external type) */
  importPath?: string;

  /** Import source package */
  importSource?: string;

  /** Is this an array? */
  isArray?: boolean;
}
