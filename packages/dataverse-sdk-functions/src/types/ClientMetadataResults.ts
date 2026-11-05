import type { ClientEntityMetadata } from "./ClientEntityMetadata.js";

/**
 * ClientMetadataResults complex type
 */
export interface ClientMetadataResults {
  Entities?: ClientEntityMetadata[];
  RelationshipNavigationEntities?: ClientEntityMetadata[];
  OtherMetadata?: string;
}
