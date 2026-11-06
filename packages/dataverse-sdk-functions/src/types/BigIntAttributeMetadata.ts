import type { AttributeMetadata } from './AttributeMetadata.js';

/**
 * BigIntAttributeMetadata entity type
 */
export interface BigIntAttributeMetadata extends AttributeMetadata {
  MaxValue?: number;
  MinValue?: number;
}
