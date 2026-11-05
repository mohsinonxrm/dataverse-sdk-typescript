import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { LookupFormat } from "./LookupFormat.js";

/**
 * ComplexLookupAttributeMetadata complex type
 */
export interface ComplexLookupAttributeMetadata extends ComplexAttributeMetadata {
  Targets?: string[];
  Format?: LookupFormat;
}
