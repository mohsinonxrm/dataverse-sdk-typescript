import type { OptionMetadata } from "./OptionMetadata.js";

/**
 * StatusOptionMetadata
 * Extends: OptionMetadata
 */
export interface StatusOptionMetadata extends OptionMetadata {
  State?: number;
  TransitionData?: string;
}
