// Public exports for this package
/**
 * @mohsinonxrm/dataverse-sdk-entities-runtime
 *
 * Runtime base classes and interfaces for generated Dataverse entity types.
 * This package provides the foundation that generated code depends on.
 *
 * @module
 */

import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

// Generated actions and functions import these from here, so generated code needs only this
// package (core comes with it).
export type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Base interface for all Dataverse entities.
 * Generated entity interfaces extend this interface.
 */
export interface IEntity {
  /** Primary key value (GUID) */
  id?: string;

  /** Logical name of the entity type */
  logicalName: string;

  /** Allow additional properties for dynamic attributes */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Represents a reference to another entity record.
 * Used for lookup/navigation properties.
 */
export interface EntityReference {
  /** Logical name of the referenced entity */
  logicalName: string;

  /** GUID of the referenced record */
  id: string;

  /** Display name (optional) */
  name?: string;
}

/**
 * Metadata descriptor for an entity attribute.
 */
export interface AttributeMetadata {
  /** Logical name of the attribute */
  logicalName: string;

  /** Schema name (PascalCase) */
  schemaName: string;

  /** Dataverse attribute type (e.g. "Lookup", "Picklist"), or the OData type when unknown */
  attributeType: string;

  /** TypeScript type representation */
  typescriptType: string;

  /** OData type of the property (e.g. "Edm.String") */
  odataType?: string;

  /** Is the attribute required (ApplicationRequired)? */
  isRequired?: boolean;

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
  attributeTypes: Record<string, string>;

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
 * Helper to create an entity reference.
 */
export function createEntityReference(
  logicalName: string,
  id: string,
  name?: string
): EntityReference {
  return { logicalName, id, name };
}

/**
 * Type guard to check if a value is an EntityReference.
 */
export function isEntityReference(value: unknown): value is EntityReference {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as EntityReference).logicalName === "string" &&
    typeof (value as EntityReference).id === "string"
  );
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
 * Helper to format an entity for create/update operations.
 * Adds the @odata.type annotation and filters undefined values.
 */
export function formatEntityForWrite(
  entity: Partial<IEntity>,
  entityMetadata: EntityMetadata
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatted: Record<string, any> = {
    "@odata.type": entityMetadata.typeName,
  };

  for (const [key, value] of Object.entries(entity)) {
    if (key !== "id" && key !== "logicalName" && value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      formatted[key] = value;
    }
  }

  return formatted;
}
