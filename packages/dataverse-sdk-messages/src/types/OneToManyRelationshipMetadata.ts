import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { CascadeConfiguration } from "./CascadeConfiguration.js";
import type { RelationshipAttribute } from "./RelationshipAttribute.js";
import type { RelationshipMetadataBase } from "./RelationshipMetadataBase.js";

/**
 * OneToManyRelationshipMetadata entity type
 */
export interface OneToManyRelationshipMetadata extends RelationshipMetadataBase {
  AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  CascadeConfiguration?: CascadeConfiguration;
  DenormalizedAttributeName?: string;
  EntityKey?: string;
  IsDenormalizedLookup?: boolean;
  IsHierarchical?: boolean;
  IsRelationshipAttributeDenormalized?: boolean;
  ReferencedAttribute?: string;
  ReferencedEntity?: string;
  ReferencedEntityNavigationPropertyName?: string;
  ReferencingAttribute?: string;
  ReferencingEntity?: string;
  ReferencingEntityNavigationPropertyName?: string;
  RelationshipAttributes?: RelationshipAttribute[];
  RelationshipBehavior?: number;
}
