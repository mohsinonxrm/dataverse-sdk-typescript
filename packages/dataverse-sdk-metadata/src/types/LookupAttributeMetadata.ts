import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { LookupFormat } from "./LookupFormat.js";

/**
 * LookupAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface LookupAttributeMetadata extends AttributeMetadata {
  Format?: LookupFormat;
  Targets?: string[];
}
