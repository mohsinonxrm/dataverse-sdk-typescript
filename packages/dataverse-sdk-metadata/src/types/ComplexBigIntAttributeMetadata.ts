import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";

/**
 * ComplexBigIntAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexBigIntAttributeMetadata extends ComplexAttributeMetadata {
  MaxValue?: number;
  MinValue?: number;
}
