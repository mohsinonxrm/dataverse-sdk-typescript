import type { DependentAttributeMetadataCollection } from "./DependentAttributeMetadataCollection.js";
import type { DependentEntityMetadataCollection } from "./DependentEntityMetadataCollection.js";
import type { DependentRelationshipCollection } from "./DependentRelationshipCollection.js";

/**
 * EntityRelationsWithDependantEntityMetadata
 */
export interface EntityRelationsWithDependantEntityMetadata {
  AttributesMetadata?: DependentAttributeMetadataCollection;
  DependantEntitiesCollection?: DependentEntityMetadataCollection;
  DisplayName?: string;
  EntityId?: string;
  EntityRelationshipCollection?: DependentRelationshipCollection;
  LogicalCollectionName?: string;
  LogicalName?: string;
  ObjectTypeCode?: number;
  PrimaryIdAttribute?: string;
  PrimaryNameAttribute?: string;
}
