import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDecimalAttributeMetadata complex type
 */
export interface ComplexDecimalAttributeMetadata {
  MaxValue: number;
  MinValue: number;
  Precision: number;
  ImeMode: ImeMode;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
