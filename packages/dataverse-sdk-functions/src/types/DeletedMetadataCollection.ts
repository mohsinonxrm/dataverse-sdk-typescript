import type { DeletedMetadataFilters } from "./DeletedMetadataFilters.js";
import type { GuidCollection } from "./GuidCollection.js";

/**
 * DeletedMetadataCollection complex type
 */
export interface DeletedMetadataCollection {
  Count?: number;
  IsReadOnly?: boolean;
  Keys: DeletedMetadataFilters[];
  Values?: GuidCollection[];
}
