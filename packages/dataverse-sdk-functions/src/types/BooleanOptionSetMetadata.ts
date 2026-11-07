import type { OptionMetadata } from "./OptionMetadata.js";
import type { OptionSetMetadataBase } from "./OptionSetMetadataBase.js";

/**
 * BooleanOptionSetMetadata entity type
 */
export interface BooleanOptionSetMetadata extends OptionSetMetadataBase {
  FalseOption?: OptionMetadata;
  TrueOption?: OptionMetadata;
}
