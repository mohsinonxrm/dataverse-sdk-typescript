import type { AttributeMetadata } from "./AttributeMetadata.js";

/**
 * BigIntAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface BigIntAttributeMetadata extends AttributeMetadata {
  MaxValue?: number;
  MinValue?: number;
}
