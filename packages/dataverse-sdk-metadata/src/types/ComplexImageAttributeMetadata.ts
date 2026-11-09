import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";

/**
 * ComplexImageAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexImageAttributeMetadata extends ComplexAttributeMetadata {
  CanStoreFullImage?: boolean;
  IsPrimaryImage?: boolean;
  MaxHeight?: number;
  MaxSizeInKB?: number;
  MaxWidth?: number;
}
