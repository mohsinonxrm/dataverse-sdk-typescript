import type { AttributeMetadata } from "./AttributeMetadata.js";

/**
 * ImageAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface ImageAttributeMetadata extends AttributeMetadata {
  CanStoreFullImage?: boolean;
  IsPrimaryImage?: boolean;
  MaxHeight?: number;
  MaxSizeInKB?: number;
  MaxWidth?: number;
}
