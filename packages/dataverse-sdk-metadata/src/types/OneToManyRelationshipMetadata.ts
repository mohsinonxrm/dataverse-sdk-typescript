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
  Lookup?: LookupAttributeMetadata;
}
