import type { ClientEntityMetadata } from "./ClientEntityMetadata.js";

/**
 * ClientMetadataResults
 */
export interface ClientMetadataResults {
  Entities?: ClientEntityMetadata[];
  RelationshipNavigationEntities?: ClientEntityMetadata[];
  OtherMetadata?: string;
}
