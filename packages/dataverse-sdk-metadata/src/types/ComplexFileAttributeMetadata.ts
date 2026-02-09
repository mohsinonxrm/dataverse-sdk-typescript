import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";

/**
 * ComplexFileAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexFileAttributeMetadata extends ComplexAttributeMetadata {
  MaxSizeInKB?: number;
}
