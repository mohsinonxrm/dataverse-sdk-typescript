import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * PicklistAttributeMetadata
 * Extends: EnumAttributeMetadata
 */
export interface PicklistAttributeMetadata extends EnumAttributeMetadata {
  ChildPicklistLogicalNames?: string[];
  FormulaDefinition?: string;
  ParentPicklistLogicalName?: string;
  SourceTypeMask?: number;
}
