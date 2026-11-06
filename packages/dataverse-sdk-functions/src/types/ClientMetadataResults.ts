import type { ClientEntityMetadata } from "./ClientEntityMetadata.js";

/**
 * ClientMetadataResults complex type
 */
export interface ClientMetadataResults {
  Entities?: ClientEntityMetadata[];
  OtherMetadata?: string;
  RelationshipNavigationEntities?: ClientEntityMetadata[];
}
