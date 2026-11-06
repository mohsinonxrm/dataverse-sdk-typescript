import type { OptionMetadata } from './OptionMetadata.js';
import type { OptionSetMetadataBase } from './OptionSetMetadataBase.js';

/**
 * OptionSetMetadata entity type
 */
export interface OptionSetMetadata extends OptionSetMetadataBase {
  Options?: OptionMetadata[];
  ParentOptionSetName?: string;
}
