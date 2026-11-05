import type { DependentAttributeMetadataCollection } from "./DependentAttributeMetadataCollection.js";
import type { DependentRelationshipCollection } from "./DependentRelationshipCollection.js";

/**
 * DependentEntityMetadata complex type
 */
export interface DependentEntityMetadata {
  EntityId?: string;
  LogicalName?: string;
  LogicalCollectionName?: string;
  ObjectTypeCode?: number;
  DisplayName?: string;
  PrimaryNameAttribute?: string;
  PrimaryIdAttribute?: string;
  HasHierarchicalRelationship?: boolean;
  Attributes?: DependentAttributeMetadataCollection;
  Relationships?: DependentRelationshipCollection;
}
