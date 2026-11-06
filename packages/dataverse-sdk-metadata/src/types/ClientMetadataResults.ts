import type { ClientEntityMetadata } from "./ClientEntityMetadata.js";

/**
 * ClientMetadataResults
 */
export interface ClientMetadataResults {
  Entities?: ClientEntityMetadata[];
  OtherMetadata?: string;
  RelationshipNavigationEntities?: ClientEntityMetadata[];
}
