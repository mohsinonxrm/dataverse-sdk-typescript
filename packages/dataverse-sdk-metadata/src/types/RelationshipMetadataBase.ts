import type { MetadataBase } from "./MetadataBase.js";

/**
 * RelationshipMetadataBase - base interface for relationship metadata
 * (Not present in CSDL - manually maintained)
 */
export interface RelationshipMetadataBase extends MetadataBase {
  IsCustomRelationship?: boolean;
  IsCustomizable?: { Value: boolean; CanBeChanged: boolean };
  IsManaged?: boolean;
  IsValidForAdvancedFind?: boolean;
  SchemaName?: string;
  SecurityTypes?: string;
  RelationshipType?: string;
  IntroducedVersion?: string;
}
