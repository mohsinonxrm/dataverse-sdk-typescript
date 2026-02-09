import type { MetadataControlOptions } from "./MetadataControlOptions.js";
import type { MetadataEntityOptions } from "./MetadataEntityOptions.js";

/**
 * GCMMetadataOptions complex type
 */
export interface GCMMetadataOptions {
  EntityOptions: MetadataEntityOptions;
  ControlOptions: MetadataControlOptions;
}
