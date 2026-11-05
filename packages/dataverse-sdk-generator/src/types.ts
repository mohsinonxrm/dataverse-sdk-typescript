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
  apiVersion?: string;

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
  };

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
  AttributeType?: string;

  /** TypeScript type */
  TypeScriptType: TypeScriptType;

  /** Is this nullable? */
  Nullable?: boolean;

  /** Is this read-only? */
  IsReadOnly?: boolean;

  /** Is this required? (ApplicationRequired) */
  IsRequired?: boolean;

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

  /** Source type: 0=simple, 1=calculated, 2=rollup */
  SourceType?: number;

  /** Attribute this extends (for virtual attributes) */
  AttributeOf?: string;

  /** Display name (localized) */
  DisplayName?: string;

  /** Description (localized) */
  Description?: string;

  /** Date/time format */
  Format?: string;
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

  /** Parameters */
  Parameters: ParameterType[];

  /** Return type */
  ReturnType?: TypeScriptType;
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

  /** Parameters */
  Parameters: ParameterType[];

  /** Return type */
  ReturnType?: TypeScriptType;

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
