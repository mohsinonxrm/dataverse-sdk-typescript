import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";
import type { RelationshipType } from "./RelationshipType.js";
import type { SecurityTypes } from "./SecurityTypes.js";

/**
 * RelationshipMetadataBase entity type
 */
export interface RelationshipMetadataBase {
  IsCustomRelationship: boolean;
  IsCustomizable: BooleanManagedProperty;
  IsValidForAdvancedFind: boolean;
  SchemaName: string;
  SecurityTypes: SecurityTypes;
  IsManaged: boolean;
  RelationshipType: RelationshipType;
  IntroducedVersion: string;
}
