import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ComplexBooleanOptionSetMetadata } from "./ComplexBooleanOptionSetMetadata.js";

/**
 * ComplexBooleanAttributeMetadata complex type
 */
export interface ComplexBooleanAttributeMetadata extends ComplexAttributeMetadata {
  DefaultValue?: boolean;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  OptionSet?: ComplexBooleanOptionSetMetadata;
}
