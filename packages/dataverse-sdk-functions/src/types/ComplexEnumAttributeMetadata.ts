import type { ComplexAttributeMetadata } from './ComplexAttributeMetadata.js';
import type { ComplexOptionSetMetadata } from './ComplexOptionSetMetadata.js';

/**
 * ComplexEnumAttributeMetadata complex type
 */
export interface ComplexEnumAttributeMetadata extends ComplexAttributeMetadata {
  DefaultFormValue?: number;
  OptionSet?: ComplexOptionSetMetadata;
}
