import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * MultiSelectPicklistAttributeMetadata
 * Extends: EnumAttributeMetadata
 */
export interface MultiSelectPicklistAttributeMetadata extends EnumAttributeMetadata {
  ChildPicklistLogicalNames?: string[];
  FormulaDefinition?: string;
  ParentPicklistLogicalName?: string;
  SourceTypeMask?: number;
}
