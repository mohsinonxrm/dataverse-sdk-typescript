import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * MultiSelectPicklistAttributeMetadata
 * Extends: EnumAttributeMetadata
 */
export interface MultiSelectPicklistAttributeMetadata extends EnumAttributeMetadata {
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  ParentPicklistLogicalName?: string;
  ChildPicklistLogicalNames?: string[];
}
