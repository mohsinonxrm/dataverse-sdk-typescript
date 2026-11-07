import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ComplexBooleanOptionSetMetadata } from "./ComplexBooleanOptionSetMetadata.js";

/**
 * ComplexBooleanAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexBooleanAttributeMetadata extends ComplexAttributeMetadata {
  DefaultValue?: boolean;
  FormulaDefinition?: string;
  OptionSet?: ComplexBooleanOptionSetMetadata;
  SourceTypeMask?: number;
}
