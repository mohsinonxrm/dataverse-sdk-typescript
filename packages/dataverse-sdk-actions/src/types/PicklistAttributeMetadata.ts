/**
 * PicklistAttributeMetadata entity type
 */
export interface PicklistAttributeMetadata {
  FormulaDefinition: string;
  SourceTypeMask: number;
  ParentPicklistLogicalName: string;
  ChildPicklistLogicalNames: string[];
}
