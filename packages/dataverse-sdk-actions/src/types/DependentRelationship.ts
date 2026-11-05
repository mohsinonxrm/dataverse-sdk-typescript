import type { DependentManyToManyRelationshipMetadata } from "./DependentManyToManyRelationshipMetadata.js";
import type { RelationshipType } from "./RelationshipType.js";

/**
 * DependentRelationship complex type
 */
export interface DependentRelationship {
  MetadataId?: string;
  Name?: string;
  EntityRelationshipType?: RelationshipType;
  ReferencingAttribute?: string;
  ReferencedAttribute?: string;
  RelationshipEntity?: string;
  IsValidForAdvancedFind?: boolean;
  HasReadPrivilege?: boolean;
  IsHierarchical?: boolean;
  ManyToManyRelationshipMetadata?: DependentManyToManyRelationshipMetadata;
}
