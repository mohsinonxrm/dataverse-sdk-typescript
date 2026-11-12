import type { AssociatedMenuConfiguration } from "./AssociatedMenuConfiguration.js";
import type { CascadeConfiguration } from "./CascadeConfiguration.js";
import type { LookupAttributeMetadata } from "./LookupAttributeMetadata.js";
import type { RelationshipAttribute } from "./RelationshipAttribute.js";
import type { RelationshipMetadataBase } from "./RelationshipMetadataBase.js";
import type { RelationshipBehavior } from "./metadata-values.js";

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
  /** The relationship's type of behavior: see `RelationshipBehavior`. */
  RelationshipBehavior?: RelationshipBehavior | (number & {});
  Lookup?: LookupAttributeMetadata;
}
