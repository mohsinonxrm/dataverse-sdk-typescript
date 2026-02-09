import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { LookupFormat } from "./LookupFormat.js";

/**
 * ComplexLookupAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexLookupAttributeMetadata extends ComplexAttributeMetadata {
  Targets?: string[];
  Format?: LookupFormat;
}
