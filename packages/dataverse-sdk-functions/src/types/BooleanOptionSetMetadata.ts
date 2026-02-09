import type { OptionMetadata } from "./OptionMetadata.js";

/**
 * BooleanOptionSetMetadata entity type
 */
export interface BooleanOptionSetMetadata {
  TrueOption: OptionMetadata;
  FalseOption: OptionMetadata;
}
