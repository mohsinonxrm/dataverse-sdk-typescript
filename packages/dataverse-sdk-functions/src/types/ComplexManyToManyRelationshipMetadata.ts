import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { RelationshipType } from "./RelationshipType.js";
import type { SecurityTypes } from "./SecurityTypes.js";

/**
 * ComplexManyToManyRelationshipMetadata complex type
 */
export interface ComplexManyToManyRelationshipMetadata {
  Entity1AssociatedMenuConfiguration: AssociatedMenuConfiguration;
  Entity2AssociatedMenuConfiguration: AssociatedMenuConfiguration;
  Entity1LogicalName: string;
  Entity2LogicalName: string;
  IntersectEntityName: string;
  Entity1IntersectAttribute: string;
  Entity2IntersectAttribute: string;
  Entity1NavigationPropertyName: string;
  Entity2NavigationPropertyName: string;
  IsCustomRelationship: boolean;
  IsCustomizable: BooleanManagedProperty;
  IsValidForAdvancedFind: boolean;
  SchemaName: string;
  SecurityTypes: SecurityTypes;
  IsManaged: boolean;
  RelationshipType: RelationshipType;
  IntroducedVersion: string;
  MetadataId: string;
  HasChanged: boolean;
}
