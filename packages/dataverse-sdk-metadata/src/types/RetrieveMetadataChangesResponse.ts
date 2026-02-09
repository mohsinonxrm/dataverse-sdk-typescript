import type { ComplexEntityMetadata } from "./ComplexEntityMetadata.js";
import type { DeletedMetadataCollection } from "./DeletedMetadataCollection.js";

/**
 * RetrieveMetadataChangesResponse
 */
export interface RetrieveMetadataChangesResponse {
  ServerVersionStamp?: string;
  DeletedMetadata?: DeletedMetadataCollection;
  EntityMetadata?: ComplexEntityMetadata[];
}
