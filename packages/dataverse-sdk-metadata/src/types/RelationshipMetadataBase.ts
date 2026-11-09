import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
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
