import type { DependentAttributeMetadataCollection } from "./DependentAttributeMetadataCollection.js";
import type { DependentEntityMetadataCollection } from "./DependentEntityMetadataCollection.js";
import type { DependentRelationshipCollection } from "./DependentRelationshipCollection.js";

/**
 * EntityRelationsWithDependantEntityMetadata complex type
 */
export interface EntityRelationsWithDependantEntityMetadata {
  EntityId: string;
  LogicalName: string;
  LogicalCollectionName: string;
  ObjectTypeCode: number;
  DisplayName: string;
  PrimaryNameAttribute: string;
  PrimaryIdAttribute: string;
  AttributesMetadata: DependentAttributeMetadataCollection;
  EntityRelationshipCollection: DependentRelationshipCollection;
  DependantEntitiesCollection: DependentEntityMetadataCollection;
}
