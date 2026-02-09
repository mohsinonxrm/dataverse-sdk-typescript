import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDecimalAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexDecimalAttributeMetadata extends ComplexAttributeMetadata {
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  ImeMode?: ImeMode;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
