import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { CascadeConfiguration } from "./CascadeConfiguration.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { RelationshipAttribute } from "./RelationshipAttribute.js";
import type { RelationshipMetadataBase } from "./RelationshipMetadataBase.js";

/**
 * OneToManyRelationshipMetadata
 * Extends: RelationshipMetadataBase
 */
export interface OneToManyRelationshipMetadata extends RelationshipMetadataBase {
  AssociatedMenuConfiguration?: AssociatedMenuConfiguration;
  CascadeConfiguration?: CascadeConfiguration;
  ReferencedAttribute?: string;
  ReferencedEntity?: string;
  ReferencingAttribute?: string;
  ReferencingEntity?: string;
  IsHierarchical?: boolean;
  EntityKey?: string;
  RelationshipAttributes?: RelationshipAttribute[];
  IsRelationshipAttributeDenormalized?: boolean;
  ReferencedEntityNavigationPropertyName?: string;
  ReferencingEntityNavigationPropertyName?: string;
  RelationshipBehavior?: number;
  IsDenormalizedLookup?: boolean;
  DenormalizedAttributeName?: string;
  Lookup?: LookupAttributeMetadata;
}
