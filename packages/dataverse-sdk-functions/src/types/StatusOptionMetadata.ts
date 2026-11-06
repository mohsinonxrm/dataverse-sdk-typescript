import type { OptionMetadata } from './OptionMetadata.js';

/**
 * StatusOptionMetadata complex type
 */
export interface StatusOptionMetadata extends OptionMetadata {
  State?: number;
  TransitionData?: string;
}
