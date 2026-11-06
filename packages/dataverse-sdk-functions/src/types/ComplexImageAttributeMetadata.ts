import type { ComplexAttributeMetadata } from './ComplexAttributeMetadata.js';

/**
 * ComplexImageAttributeMetadata complex type
 */
export interface ComplexImageAttributeMetadata extends ComplexAttributeMetadata {
  CanStoreFullImage?: boolean;
  IsPrimaryImage?: boolean;
  MaxHeight?: number;
  MaxSizeInKB?: number;
  MaxWidth?: number;
}
