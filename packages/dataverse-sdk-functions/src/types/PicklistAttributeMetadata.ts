import type { EnumAttributeMetadata } from './EnumAttributeMetadata.js';

/**
 * PicklistAttributeMetadata entity type
 */
export interface PicklistAttributeMetadata extends EnumAttributeMetadata {
  ChildPicklistLogicalNames?: string[];
  FormulaDefinition?: string;
  ParentPicklistLogicalName?: string;
  SourceTypeMask?: number;
}
