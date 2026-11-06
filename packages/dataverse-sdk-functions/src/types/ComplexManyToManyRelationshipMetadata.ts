import type { AssociatedMenuConfiguration } from './AssociatedMenuConfiguration.js';
import type { BooleanManagedProperty } from './BooleanManagedProperty.js';
import type { RelationshipType } from './RelationshipType.js';
import type { SecurityTypes } from './SecurityTypes.js';

/**
 * ComplexManyToManyRelationshipMetadata complex type
 */
export interface ComplexManyToManyRelationshipMetadata {
  Entity1AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  Entity1IntersectAttribute?: string;
  Entity1LogicalName?: string;
  Entity1NavigationPropertyName?: string;
  Entity2AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  Entity2IntersectAttribute?: string;
  Entity2LogicalName?: string;
  Entity2NavigationPropertyName?: string;
  HasChanged?: boolean;
  IntersectEntityName?: string;
  IntroducedVersion?: string;
  IsCustomRelationship?: boolean;
  IsCustomizable?: BooleanManagedProperty;
  IsManaged?: boolean;
  IsValidForAdvancedFind?: boolean;
  MetadataId?: string;
  RelationshipType?: RelationshipType;
  SchemaName?: string;
  SecurityTypes?: SecurityTypes;
}
