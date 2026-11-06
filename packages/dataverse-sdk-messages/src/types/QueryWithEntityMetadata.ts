import type { DependentEntityMetadataCollection } from "./DependentEntityMetadataCollection.js";
import type { QueryMetadata } from "./QueryMetadata.js";

/**
 * QueryWithEntityMetadata complex type
 */
export interface QueryWithEntityMetadata {
  DependantEntitiesCollection?: DependentEntityMetadataCollection;
  QueryMetadata?: QueryMetadata;
}
