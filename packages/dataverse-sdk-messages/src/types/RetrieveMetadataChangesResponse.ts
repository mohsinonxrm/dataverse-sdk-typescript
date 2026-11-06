import type { ComplexEntityMetadata } from "./ComplexEntityMetadata.js";
import type { DeletedMetadataCollection } from "./DeletedMetadataCollection.js";

/**
 * RetrieveMetadataChangesResponse complex type
 */
export interface RetrieveMetadataChangesResponse {
  ServerVersionStamp?: string;
  DeletedMetadata?: DeletedMetadataCollection;
  EntityMetadata?: ComplexEntityMetadata[];
}
