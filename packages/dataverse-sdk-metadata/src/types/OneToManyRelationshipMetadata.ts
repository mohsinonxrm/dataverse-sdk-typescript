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
  /** Undocumented by Microsoft, and set by Dataverse. It isn't the relationship's type of behavior: what an action on the parent does to the children is in `CascadeConfiguration`. In practice it follows `SecurityTypes` (0 None, 1 Append, 2 ParentChild, 4 and 12 Pointer). */
  RelationshipBehavior?: number;
  Lookup?: LookupAttributeMetadata;
}
