import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * PicklistAttributeMetadata entity type
 */
export interface PicklistAttributeMetadata extends EnumAttributeMetadata {
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  ParentPicklistLogicalName?: string;
  ChildPicklistLogicalNames?: string[];
}
