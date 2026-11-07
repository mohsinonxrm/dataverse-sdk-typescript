import type { OptionMetadata } from "./OptionMetadata.js";

/**
 * StateOptionMetadata complex type
 */
export interface StateOptionMetadata extends OptionMetadata {
  DefaultStatus?: number;
  InvariantName?: string;
}
