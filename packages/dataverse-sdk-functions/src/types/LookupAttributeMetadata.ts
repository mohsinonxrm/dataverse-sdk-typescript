import type { LookupFormat } from "./LookupFormat.js";

/**
 * LookupAttributeMetadata entity type
 */
export interface LookupAttributeMetadata {
  Targets: string[];
  Format: LookupFormat;
}
