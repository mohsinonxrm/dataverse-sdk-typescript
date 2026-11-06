import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { CascadeConfiguration } from "./CascadeConfiguration.js";
import type { RelationshipAttribute } from "./RelationshipAttribute.js";
import type { RelationshipType } from "./RelationshipType.js";
import type { SecurityTypes } from "./SecurityTypes.js";

/**
 * ComplexOneToManyRelationshipMetadata complex type
 */
export interface ComplexOneToManyRelationshipMetadata {
  AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  CascadeConfiguration?: CascadeConfiguration;
  ReferencedAttribute?: string;
  ReferencedEntity?: string;
  ReferencingAttribute?: string;
  ReferencingEntity?: string;
  IsHierarchical?: boolean;
  EntityKey?: string;
  RelationshipAttributes?: RelationshipAttribute[];
  IsRelationshipAttributeDenormalized?: boolean;
  ReferencedEntityNavigationPropertyName?: string;
  ReferencingEntityNavigationPropertyName?: string;
  RelationshipBehavior?: number;
  IsDenormalizedLookup?: boolean;
  DenormalizedAttributeName?: string;
  IsCustomRelationship?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsValidForAdvancedFind?: boolean;
  SchemaName?: string;
  SecurityTypes?: SecurityTypes;
  IsManaged?: boolean;
  RelationshipType?: RelationshipType;
  IntroducedVersion?: string;
  MetadataId?: string;
  HasChanged?: boolean;
}
