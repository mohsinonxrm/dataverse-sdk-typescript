import type { ImeMode } from "./ImeMode.js";

/**
 * MoneyAttributeMetadata entity type
 */
export interface MoneyAttributeMetadata {
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
