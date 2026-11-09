import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetMetadataBase } from "./OptionSetMetadataBase.js";

/**
 * BooleanOptionSetMetadata
 * Extends: OptionSetMetadataBase
 */
export interface BooleanOptionSetMetadata extends OptionSetMetadataBase {
  FalseOption?: OptionMetadata;
  TrueOption?: OptionMetadata;
}
