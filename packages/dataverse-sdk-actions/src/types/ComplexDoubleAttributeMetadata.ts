import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDoubleAttributeMetadata complex type
 */
export interface ComplexDoubleAttributeMetadata extends ComplexAttributeMetadata {
  ImeMode?: ImeMode;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
