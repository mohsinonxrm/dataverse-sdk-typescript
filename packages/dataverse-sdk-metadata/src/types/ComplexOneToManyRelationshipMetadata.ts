import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { CascadeConfiguration } from "./CascadeConfiguration.js";
import type { RelationshipAttribute } from "./RelationshipAttribute.js";
import type { RelationshipType } from "./RelationshipType.js";
import type { SecurityTypes } from "./SecurityTypes.js";

/**
 * ComplexOneToManyRelationshipMetadata
 */
export interface ComplexOneToManyRelationshipMetadata {
  AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  CascadeConfiguration?: CascadeConfiguration;
  DenormalizedAttributeName?: string;
  EntityKey?: string;
  HasChanged?: boolean;
  IntroducedVersion?: string;
  IsCustomRelationship?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsDenormalizedLookup?: boolean;
  IsHierarchical?: boolean;
  IsManaged?: boolean;
  IsRelationshipAttributeDenormalized?: boolean;
  IsValidForAdvancedFind?: boolean;
  MetadataId?: string;
  ReferencedAttribute?: string;
  ReferencedEntity?: string;
  ReferencedEntityNavigationPropertyName?: string;
  ReferencingAttribute?: string;
  ReferencingEntity?: string;
  ReferencingEntityNavigationPropertyName?: string;
  RelationshipAttributes?: RelationshipAttribute[];
  RelationshipBehavior?: number;
  RelationshipType?: RelationshipType;
  SchemaName?: string;
  SecurityTypes?: SecurityTypes;
}
