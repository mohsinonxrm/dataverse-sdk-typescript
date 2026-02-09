import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { IntegerFormat } from "./IntegerFormat.js";

/**
 * ComplexIntegerAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexIntegerAttributeMetadata extends ComplexAttributeMetadata {
  Format?: IntegerFormat;
  MaxValue?: number;
  MinValue?: number;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
