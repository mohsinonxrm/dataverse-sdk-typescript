import type { DependentManyToManyRelationshipMetadata } from "./DependentManyToManyRelationshipMetadata.js";
import type { RelationshipType } from "./RelationshipType.js";

/**
 * DependentRelationship complex type
 */
export interface DependentRelationship {
  EntityRelationshipType?: RelationshipType;
  HasReadPrivilege?: boolean;
  IsHierarchical?: boolean;
  IsValidForAdvancedFind?: boolean;
  ManyToManyRelationshipMetadata?: DependentManyToManyRelationshipMetadata;
  MetadataId?: string;
  Name?: string;
  ReferencedAttribute?: string;
  ReferencingAttribute?: string;
  RelationshipEntity?: string;
}
