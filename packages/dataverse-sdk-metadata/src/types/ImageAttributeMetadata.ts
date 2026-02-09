import type { AttributeMetadata } from "./AttributeMetadata.js";

/**
 * ImageAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface ImageAttributeMetadata extends AttributeMetadata {
  IsPrimaryImage?: boolean;
  MaxHeight?: number;
  MaxWidth?: number;
  MaxSizeInKB?: number;
  CanStoreFullImage?: boolean;
}
