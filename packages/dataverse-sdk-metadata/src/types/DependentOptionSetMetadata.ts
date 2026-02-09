import type { DependentOptionMetadata } from "./DependentOptionMetadata.js";
import type { DependentOptionMetadataCollection } from "./DependentOptionMetadataCollection.js";

/**
 * DependentOptionSetMetadata
 */
export interface DependentOptionSetMetadata {
  Name?: string;
  Type?: string;
  TrueOption?: DependentOptionMetadata;
  FalseOption?: DependentOptionMetadata;
  Options?: DependentOptionMetadataCollection;
}
