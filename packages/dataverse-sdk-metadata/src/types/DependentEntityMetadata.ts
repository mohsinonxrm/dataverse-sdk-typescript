import type { DependentAttributeMetadataCollection } from "./DependentAttributeMetadataCollection.js";
import type { DependentRelationshipCollection } from "./DependentRelationshipCollection.js";

/**
 * DependentEntityMetadata
 */
export interface DependentEntityMetadata {
  Attributes?: DependentAttributeMetadataCollection;
  DisplayName?: string;
  EntityId?: string;
  HasHierarchicalRelationship?: boolean;
  LogicalCollectionName?: string;
  LogicalName?: string;
  ObjectTypeCode?: number;
  PrimaryIdAttribute?: string;
  PrimaryNameAttribute?: string;
  Relationships?: DependentRelationshipCollection;
}
