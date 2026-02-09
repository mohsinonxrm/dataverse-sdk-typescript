import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";

/**
 * ManyToManyRelationshipMetadata entity type
 */
export interface ManyToManyRelationshipMetadata {
  Entity1AssociatedMenuConfiguration: AssociatedMenuConfiguration;
  Entity2AssociatedMenuConfiguration: AssociatedMenuConfiguration;
  Entity1LogicalName: string;
  Entity2LogicalName: string;
  IntersectEntityName: string;
  Entity1IntersectAttribute: string;
  Entity2IntersectAttribute: string;
  Entity1NavigationPropertyName: string;
  Entity2NavigationPropertyName: string;
}
