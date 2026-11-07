import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { RelationshipMetadataBase } from "./RelationshipMetadataBase.js";

/**
 * ManyToManyRelationshipMetadata
 * Extends: RelationshipMetadataBase
 */
export interface ManyToManyRelationshipMetadata extends RelationshipMetadataBase {
  Entity1AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  Entity1IntersectAttribute?: string;
  Entity1LogicalName?: string;
  Entity1NavigationPropertyName?: string;
  Entity2AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  Entity2IntersectAttribute?: string;
  Entity2LogicalName?: string;
  Entity2NavigationPropertyName?: string;
  IntersectEntityName?: string;
}
