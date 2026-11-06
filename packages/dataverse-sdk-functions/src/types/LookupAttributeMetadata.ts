import type { AttributeMetadata } from './AttributeMetadata.js';
import type { LookupFormat } from './LookupFormat.js';

/**
 * LookupAttributeMetadata entity type
 */
export interface LookupAttributeMetadata extends AttributeMetadata {
  Format?: LookupFormat;
  Targets?: string[];
}
