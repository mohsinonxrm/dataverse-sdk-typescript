import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";

/**
 * ComplexImageAttributeMetadata complex type
 */
export interface ComplexImageAttributeMetadata extends ComplexAttributeMetadata {
  IsPrimaryImage?: boolean;
  MaxHeight?: number;
  MaxWidth?: number;
  MaxSizeInKB?: number;
  CanStoreFullImage?: boolean;
}
