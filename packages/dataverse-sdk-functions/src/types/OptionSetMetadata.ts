import type { OptionMetadata } from "./OptionMetadata.js";

/**
 * OptionSetMetadata entity type
 */
export interface OptionSetMetadata {
  Options: OptionMetadata[];
  ParentOptionSetName: string;
}
