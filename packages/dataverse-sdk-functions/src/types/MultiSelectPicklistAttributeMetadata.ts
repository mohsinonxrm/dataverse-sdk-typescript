import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * MultiSelectPicklistAttributeMetadata entity type
 */
export interface MultiSelectPicklistAttributeMetadata extends EnumAttributeMetadata {
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  ParentPicklistLogicalName?: string;
  ChildPicklistLogicalNames?: string[];
}
