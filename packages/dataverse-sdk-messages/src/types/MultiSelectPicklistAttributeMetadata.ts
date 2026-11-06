import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * MultiSelectPicklistAttributeMetadata entity type
 */
export interface MultiSelectPicklistAttributeMetadata extends EnumAttributeMetadata {
  ChildPicklistLogicalNames?: string[];
  FormulaDefinition?: string;
  ParentPicklistLogicalName?: string;
  SourceTypeMask?: number;
}
