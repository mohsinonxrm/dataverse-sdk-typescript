import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { IntegerFormat } from "./IntegerFormat.js";

/**
 * ComplexIntegerAttributeMetadata complex type
 */
export interface ComplexIntegerAttributeMetadata extends ComplexAttributeMetadata {
  Format?: IntegerFormat;
  MaxValue?: number;
  MinValue?: number;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
