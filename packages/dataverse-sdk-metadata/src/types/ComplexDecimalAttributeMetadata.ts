import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDecimalAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexDecimalAttributeMetadata extends ComplexAttributeMetadata {
  FormulaDefinition?: string;
  ImeMode?: ImeMode;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  SourceTypeMask?: number;
}
