import type { AttributeMetadata } from "./AttributeMetadata.js";

/**
 * FileAttributeMetadata entity type
 */
export interface FileAttributeMetadata extends AttributeMetadata {
  MaxSizeInKB?: number;
}
