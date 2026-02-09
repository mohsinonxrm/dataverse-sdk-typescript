import type { ComplexBooleanOptionSetMetadata } from "./ComplexBooleanOptionSetMetadata.js";

/**
 * ComplexBooleanAttributeMetadata complex type
 */
export interface ComplexBooleanAttributeMetadata {
  DefaultValue: boolean;
  FormulaDefinition: string;
  SourceTypeMask: number;
  OptionSet: ComplexBooleanOptionSetMetadata;
}
