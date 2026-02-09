import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexMoneyAttributeMetadata complex type
 */
export interface ComplexMoneyAttributeMetadata {
  ImeMode: ImeMode;
  MaxValue: number;
  MinValue: number;
  Precision: number;
  PrecisionSource: number;
  CalculationOf: string;
  FormulaDefinition: string;
  SourceTypeMask: number;
  IsBaseCurrency: boolean;
}
