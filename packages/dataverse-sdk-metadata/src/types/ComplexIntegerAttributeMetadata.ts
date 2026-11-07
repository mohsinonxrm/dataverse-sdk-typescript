import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { IntegerFormat } from "./IntegerFormat.js";

/**
 * ComplexIntegerAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexIntegerAttributeMetadata extends ComplexAttributeMetadata {
  Format?: IntegerFormat;
  FormulaDefinition?: string;
  MaxValue?: number;
  MinValue?: number;
  SourceTypeMask?: number;
}
