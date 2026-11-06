import type { AttributeMetadata } from "./AttributeMetadata.js";

/**
 * BooleanAttributeMetadata entity type
 */
export interface BooleanAttributeMetadata extends AttributeMetadata {
  DefaultValue?: boolean;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
