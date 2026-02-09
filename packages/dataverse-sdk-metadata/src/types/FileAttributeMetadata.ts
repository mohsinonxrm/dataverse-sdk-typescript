import type { AttributeMetadata } from "./AttributeMetadata.js";

/**
 * FileAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface FileAttributeMetadata extends AttributeMetadata {
  MaxSizeInKB?: number;
}
