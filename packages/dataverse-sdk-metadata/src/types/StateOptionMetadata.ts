import type { OptionMetadata } from "./OptionMetadata.js";

/**
 * StateOptionMetadata
 * Extends: OptionMetadata
 */
export interface StateOptionMetadata extends OptionMetadata {
  DefaultStatus?: number;
  InvariantName?: string;
}
