import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetMetadataBase } from "./OptionSetMetadataBase.js";

/**
 * OptionSetMetadata
 * Extends: OptionSetMetadataBase
 */
export interface OptionSetMetadata extends OptionSetMetadataBase {
  Options?: OptionMetadata[];
  ParentOptionSetName?: string;
}
