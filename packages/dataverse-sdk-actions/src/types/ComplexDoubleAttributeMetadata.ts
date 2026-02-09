import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexDoubleAttributeMetadata complex type
 */
export interface ComplexDoubleAttributeMetadata {
  ImeMode: ImeMode;
  MaxValue: number;
  MinValue: number;
  Precision: number;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
