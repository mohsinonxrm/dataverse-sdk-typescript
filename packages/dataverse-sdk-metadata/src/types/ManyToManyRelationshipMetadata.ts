import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { RelationshipMetadataBase } from "./RelationshipMetadataBase.js";

/**
 * ManyToManyRelationshipMetadata
 * Extends: RelationshipMetadataBase
 */
export interface ManyToManyRelationshipMetadata extends RelationshipMetadataBase {
  Entity1AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  Entity2AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  Entity1LogicalName?: string;
  Entity2LogicalName?: string;
  IntersectEntityName?: string;
  Entity1IntersectAttribute?: string;
  Entity2IntersectAttribute?: string;
  Entity1NavigationPropertyName?: string;
  Entity2NavigationPropertyName?: string;
}
