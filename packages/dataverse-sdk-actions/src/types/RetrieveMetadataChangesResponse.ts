import type { ComplexEntityMetadata } from "./ComplexEntityMetadata.js";
import type { DeletedMetadataCollection } from "./DeletedMetadataCollection.js";

/**
 * RetrieveMetadataChangesResponse complex type
 */
export interface RetrieveMetadataChangesResponse {
  DeletedMetadata?: DeletedMetadataCollection;
  EntityMetadata?: ComplexEntityMetadata[];
  ServerVersionStamp?: string;
}
