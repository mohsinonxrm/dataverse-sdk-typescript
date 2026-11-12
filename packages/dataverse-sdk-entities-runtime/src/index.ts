// Public exports for this package
/**
 * @mohsinonxrm/dataverse-sdk-entities-runtime
 *
 * Runtime base classes and interfaces for generated Dataverse entity types.
 * This package provides the foundation that generated code depends on.
 *
 * @module
 */

import type {
  EdmPrimitiveType,
  Executable,
  ODataTypeName,
  RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { type EntityReference, isEntityReference } from "./entity-reference.js";

// Generated actions and functions import these from here, so generated code needs only this
// package (core comes with it).
export type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

// The SDK's one record reference (#295): actions, functions, messages and xrm re-export these.
export {
  type EntityReference,
  type EntityReferenceOptions,
  type WebApiEntityReference,
  createEntityReference,
  getEntitySetNameFromReference,
  isEntityReference,
} from "./entity-reference.js";

/**
 * Base interface for all Dataverse entities.
 * Generated entity interfaces extend this interface.
 */
export interface IEntity {
  /** Primary key value (GUID) */
  id?: string;

  /**
   * Logical name of the entity type. Optional, and never sent: the Web API rejects unknown
   * properties, so `formatEntityForWrite()` drops it (the entity's metadata already says which
   * table this is).
   */
  logicalName?: string;

  /**
   * Any other column or annotation. Values are `unknown`: a generated interface that extends
   * `IEntity` declares its columns' types; for a property it doesn't declare, check the value
   * before using it.
   */
  [key: string]: unknown;
}

/**
 * A Dataverse column type, as `AttributeMetadata.AttributeType` names it (the `AttributeTypeCode`
 * member names). Choices, file and image columns are `Virtual`.
 */
export type AttributeTypeCodeName =
  | "BigInt"
  | "Boolean"
  | "CalendarRules"
  | "Customer"
  | "DateTime"
  | "Decimal"
  | "Double"
  | "EntityName"
  | "Integer"
  | "Lookup"
  | "ManagedProperty"
  | "Memo"
  | "Money"
  | "Owner"
  | "PartyList"
  | "Picklist"
  | "State"
  | "Status"
  | "String"
  | "Uniqueidentifier"
  | "Virtual";

/**
 * Metadata descriptor for an entity attribute.
 */
export interface AttributeMetadata {
  /** Logical name of the attribute */
  logicalName: string;

  /** Schema name (PascalCase) */
  schemaName: string;

  /**
   * Dataverse attribute type (e.g. "Lookup", "Picklist"), or the OData type when unknown. Any
   * other string is accepted too, for types Dataverse adds later.
   */
  attributeType: AttributeTypeCodeName | EdmPrimitiveType | (string & {});

  /** TypeScript type representation */
  typescriptType: string;

  /** OData type of the property (e.g. "Edm.String") */
  odataType?: ODataTypeName;

  /** Business-required: a caller must supply a value (`RequiredLevel` is ApplicationRequired). */
  isRequired?: boolean;

  /**
   * The column's `RequiredLevel` when it isn't None. SystemRequired columns (the primary key,
   * `ownerid`, …) are filled in by Dataverse, so they aren't `isRequired`.
   */
  requiredLevel?: "SystemRequired" | "ApplicationRequired" | "Recommended";

  /** Calculated or rollup column */
  sourceType?: "calculated" | "rollup";

  /** Is this a multi-select option set? */
  isMultiSelect?: boolean;

  /** Is this a primary key? */
  isPrimaryKey?: boolean;

  /** Is this attribute read-only? */
  isReadOnly?: boolean;

  /** For lookup attributes: target entity type(s) */
  targets?: string[];

  /** For option set attributes: enum type name */
  optionSetType?: string;

  /** Most characters a text column holds (`MaxLength`). */
  maxLength?: number;

  /** Smallest value a number column takes (`MinValue`). */
  minValue?: number;

  /** Largest value a number column takes (`MaxValue`). */
  maxValue?: number;

  /** The values of a choice or choices column's options. */
  optionValues?: number[];

  /** `false` when a create can't set the column (`IsValidForCreate`); unset when it can. */
  isValidForCreate?: boolean;

  /** `false` when an update can't set the column (`IsValidForUpdate`); unset when it can. */
  isValidForUpdate?: boolean;
}

/**
 * Navigation property metadata.
 */
export interface NavigationMetadata {
  /** Name of the navigation property */
  name: string;

  /**
   * For a polymorphic lookup, the lookup's logical name (e.g. "customerid"). The navigation
   * property for one target is `<fullName>_<target>` (e.g. "customerid_account").
   */
  fullName?: string;

  /** Related entity type */
  targetType: string;

  /** Is this a polymorphic lookup (customer, owner, regarding)? */
  isPolymorphic?: boolean;

  /** For a polymorphic lookup: the logical names of the entities it can point to */
  targets?: string[];

  /** Is this a collection? */
  isCollection: boolean;

  /** Relationship schema name */
  relationshipName: string;

  /** Referenced property (for lookups) */
  referencedProperty?: string;

  /** Referencing property (for reverse lookups) */
  referencingProperty?: string;

  /**
   * For the navigation property a lookup column is written through: the lookup's logical name
   * (`primarycontactid` for `primarycontactid`, `contoso_parentaccountid` for
   * `contoso_ParentAccountId`).
   */
  lookupAttribute?: string;

  /** The lookup is business-required (`RequiredLevel` is ApplicationRequired). */
  isRequired?: boolean;

  /** The lookup's `RequiredLevel` when it isn't None. */
  requiredLevel?: "SystemRequired" | "ApplicationRequired" | "Recommended";

  /** `false` when a create can't set the lookup (`IsValidForCreate`); unset when it can. */
  isValidForCreate?: boolean;

  /** `false` when an update can't set the lookup (`IsValidForUpdate`); unset when it can. */
  isValidForUpdate?: boolean;
}

/**
 * Complete metadata descriptor for a Dataverse entity type.
 * Generated for each entity to support runtime operations.
 */
export interface EntityMetadata {
  /** OData type name (e.g., "Microsoft.Dynamics.CRM.account") */
  typeName: string;

  /** Logical name (e.g., "account") */
  logicalName: string;

  /** Entity set name (e.g., "accounts") */
  collectionName: string;

  /** Primary key attribute name */
  primaryIdAttribute: string;

  /** Primary name attribute (if any) */
  primaryNameAttribute?: string;

  /** Map of attribute logical names to their OData types (e.g. "Edm.String") */
  attributeTypes: Record<string, ODataTypeName>;

  /** Map of navigation property names to target types and cardinality */
  navigation: Record<string, NavigationMetadata>;

  /** Full attribute metadata (optional, for detailed scenarios) */
  attributes?: Record<string, AttributeMetadata>;
}

/**
 * Options for entity operations.
 */
export interface EntityOperationOptions {
  /** Include annotations in response (e.g., formattedvalues) */
  includeAnnotations?: string[];

  /** Select specific properties */
  select?: string[];

  /** Expand navigation properties */
  expand?: string[];

  /** Return representation after create/update */
  returnRepresentation?: boolean;
}

/**
 * Base class for generated action executables. It implements core's `Executable`, so an
 * instance can be passed straight to `DataverseClient.execute()`.
 */
export abstract class ActionBase<TResponse = void> implements Executable<TResponse> {
  abstract toRequestInformation(baseUrl: string): RequestInformation;

  abstract parseResponse(response: Response): Promise<TResponse>;
}

/**
 * Base class for generated function executables. It implements core's `Executable`, so an
 * instance can be passed straight to `DataverseClient.execute()`.
 */
export abstract class FunctionBase<TResponse> implements Executable<TResponse> {
  abstract toRequestInformation(baseUrl: string): RequestInformation;

  abstract parseResponse(response: Response): Promise<TResponse>;
}

/**
 * Type guard to check if a value is an IEntity.
 */
export function isEntity(value: unknown): value is IEntity {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as IEntity).logicalName === "string"
  );
}

export { formatParameterAlias, formatRecordPath, type ParameterKind } from "./parameters.js";

export {
  type CollectionNavigation,
  EntityRecordClient,
  EntitySetClient,
  type Expand,
  type ExpandedNames,
  type ExpandedProperties,
  type ExpandedValue,
  type ExpandFilterOption,
  type ExpandLimitOptions,
  type ExpandNoLimitOptions,
  type ExpandPropertyOptions,
  type ExpandSelectOption,
  type GetRecordOptions,
  type ListRecordsOptions,
  type ManyToManyNavigation,
  type NavigationProperty,
  type ReadResult,
  type RecordAnnotations,
  type SelectedColumns,
  type SingleNavigation,
  type UntypedNavigation,
  type WithoutProperties,
  type WriteRecordOptions,
} from "./entity-set.js";

export {
  validateEntity,
  type ValidateEntityOptions,
  type ValidationIssue,
  type ValidationIssueCode,
} from "./validate.js";

/**
 * Helper to get the OData type annotation for an entity.
 */
export function getODataType(entityMetadata: EntityMetadata): string {
  return entityMetadata.typeName;
}

/**
 * Helper to get the collection URL for an entity type.
 */
export function getCollectionUrl(entityMetadata: EntityMetadata, baseUrl: string): string {
  return `${baseUrl}/${entityMetadata.collectionName}`;
}

/**
 * Helper to get the single entity URL.
 */
export function getEntityUrl(entityMetadata: EntityMetadata, id: string, baseUrl: string): string {
  return `${baseUrl}/${entityMetadata.collectionName}(${id})`;
}

/**
 * Options for {@link formatEntityForWrite}.
 */
export interface FormatEntityForWriteOptions {
  /**
   * Metadata of the tables lookups can point to, keyed by logical name (the generated
   * `EntityMetadataCache`). Used to find a referenced table's entity set.
   */
  metadataCache?: Record<string, EntityMetadata>;

  /** Entity set names keyed by logical name (e.g. `{ contact: "contacts" }`). */
  entitySetNames?: Record<string, string>;
}

/**
 * Format an entity for a create (POST) or update (PATCH) body.
 *
 * - Adds the `@odata.type` annotation.
 * - Drops `id`, `logicalName` and `undefined` values (`null` is kept: it clears the column).
 *   A `null` lookup becomes `"<navigation property>@odata.bind": null`, which is how Dataverse
 *   clears one; for a polymorphic lookup (`customerid`, `ownerid`) that is sent for each target.
 * - Turns lookups into `@odata.bind`: an {@link EntityReference} value becomes
 *   `"<navigation property>@odata.bind": "/<entity set>(<id>)"`, and an array of references
 *   becomes an array of those paths (associating records on create). For a polymorphic lookup
 *   such as `customerid`, the navigation property for the reference's table is used
 *   (`customerid_account`).
 *
 * The referenced table's entity set comes from `reference.entitySetName` (which
 * {@link createEntityReference} fills in for the tables in the SDK's `$metadata` snapshot), then
 * `options.entitySetNames`, then `options.metadataCache`. A custom table needs one of these.
 *
 * @throws DataverseInvalidRequestError when a reference's entity set can't be found.
 *
 * @example
 * ```typescript
 * const body = formatEntityForWrite(
 *   { name: "Contoso", primarycontactid: createEntityReference("contact", contactId) },
 *   AccountMetadata,
 *   { metadataCache: EntityMetadataCache }
 * );
 * // { "@odata.type": "Microsoft.Dynamics.CRM.account", name: "Contoso",
 * //   "primarycontactid@odata.bind": "/contacts(…)" }
 * ```
 */
export function formatEntityForWrite(
  entity: Partial<IEntity>,
  entityMetadata: EntityMetadata,
  options: FormatEntityForWriteOptions = {}
): Record<string, unknown> {
  const formatted: Record<string, unknown> = {
    "@odata.type": entityMetadata.typeName,
  };

  for (const [key, value] of Object.entries(entity)) {
    if (key === "id" || key === "logicalName" || value === undefined) continue;

    if (isEntityReference(value)) {
      formatted[`${bindingProperty(key, value, entityMetadata)}@odata.bind`] = bindingPath(
        value,
        options
      );
    } else if (Array.isArray(value) && value.length > 0 && value.every(isEntityReference)) {
      formatted[`${key}@odata.bind`] = value.map((ref) => bindingPath(ref, options));
    } else if (value === null && lookupNavigationProperties(key, entityMetadata).length > 0) {
      // A lookup's logical name isn't a writable property: it is cleared through its navigation
      // property, `<nav>@odata.bind: null` (#363). A polymorphic lookup has one per target.
      for (const nav of lookupNavigationProperties(key, entityMetadata)) {
        formatted[`${nav}@odata.bind`] = null;
      }
    } else {
      formatted[key] = value;
    }
  }

  return formatted;
}

/** The single-valued navigation property to bind `reference` through. */
function bindingProperty(
  key: string,
  reference: EntityReference,
  entityMetadata: EntityMetadata
): string {
  const navigation = Object.prototype.hasOwnProperty.call(entityMetadata.navigation, key)
    ? entityMetadata.navigation[key]
    : undefined;
  if (navigation?.isPolymorphic) {
    return `${navigation.fullName ?? key}_${reference.logicalName}`;
  }
  if (navigation) return navigation.name;
  // A polymorphic lookup that wasn't consolidated: one navigation property per target.
  const perTarget = `${key}_${reference.logicalName}`;
  if (Object.prototype.hasOwnProperty.call(entityMetadata.navigation, perTarget)) {
    return perTarget;
  }
  return key;
}

/**
 * The single-valued navigation properties that write the lookup `key`, or none when `key` isn't a
 * lookup: the lookup's own navigation property; for a consolidated polymorphic lookup, one per
 * target (`customerid_account`, `customerid_contact`); and for one that wasn't consolidated, the
 * per-target entries already in the metadata.
 */
function lookupNavigationProperties(key: string, entityMetadata: EntityMetadata): string[] {
  const own = (name: string) =>
    Object.prototype.hasOwnProperty.call(entityMetadata.navigation, name)
      ? entityMetadata.navigation[name]
      : undefined;
  const navigation = own(key);
  if (navigation) {
    if (navigation.isCollection) return [];
    if (navigation.isPolymorphic && navigation.targets?.length) {
      return navigation.targets.map((target) => `${navigation.fullName ?? key}_${target}`);
    }
    return [navigation.name];
  }
  return Object.entries(entityMetadata.navigation)
    .filter(([name, nav]) => !nav.isCollection && name === `${key}_${nav.targetType}`)
    .map(([, nav]) => nav.name);
}

/** `/<entity set>(<id>)` for a reference. */
function bindingPath(reference: EntityReference, options: FormatEntityForWriteOptions): string {
  const entitySetName =
    reference.entitySetName ??
    lookup(options.entitySetNames, reference.logicalName) ??
    lookup(options.metadataCache, reference.logicalName)?.collectionName;
  if (!entitySetName) {
    throw DataverseInvalidRequestError.invalidParameter(
      "entity",
      `no entity set is known for '${reference.logicalName}'. Set entitySetName on the reference, ` +
        "or pass metadataCache (the generated EntityMetadataCache) or entitySetNames."
    );
  }
  return `/${entitySetName}(${reference.id.replace(/^\{|\}$/g, "")})`;
}

function lookup<T>(record: Record<string, T> | undefined, key: string): T | undefined {
  return record && Object.prototype.hasOwnProperty.call(record, key) ? record[key] : undefined;
}
