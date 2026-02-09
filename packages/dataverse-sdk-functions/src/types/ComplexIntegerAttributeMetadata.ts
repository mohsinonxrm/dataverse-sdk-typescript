import type { IntegerFormat } from "./IntegerFormat.js";

/**
 * ComplexIntegerAttributeMetadata complex type
 */
export interface ComplexIntegerAttributeMetadata {
  Format: IntegerFormat;
  MaxValue: number;
  MinValue: number;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
