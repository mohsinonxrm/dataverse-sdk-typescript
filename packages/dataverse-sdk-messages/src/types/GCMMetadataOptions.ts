import type { MetadataControlOptions } from "./MetadataControlOptions.js";
import type { MetadataEntityOptions } from "./MetadataEntityOptions.js";

/**
 * GCMMetadataOptions complex type
 */
export interface GCMMetadataOptions {
  ControlOptions?: MetadataControlOptions;
  EntityOptions?: MetadataEntityOptions;
}
