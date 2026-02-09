import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * PicklistAttributeMetadata
 * Extends: EnumAttributeMetadata
 */
export interface PicklistAttributeMetadata extends EnumAttributeMetadata {
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  ParentPicklistLogicalName?: string;
  ChildPicklistLogicalNames?: string[];
}
