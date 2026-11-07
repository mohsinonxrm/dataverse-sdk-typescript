import type { DependentOptionMetadata } from "./DependentOptionMetadata.js";
import type { DependentOptionMetadataCollection } from "./DependentOptionMetadataCollection.js";

/**
 * DependentOptionSetMetadata
 */
export interface DependentOptionSetMetadata {
  FalseOption?: DependentOptionMetadata;
  Name?: string;
  Options?: DependentOptionMetadataCollection;
  TrueOption?: DependentOptionMetadata;
  Type?: string;
}
