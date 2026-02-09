import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexMoneyAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexMoneyAttributeMetadata extends ComplexAttributeMetadata {
  ImeMode?: ImeMode;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  PrecisionSource?: number;
  CalculationOf?: string;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  IsBaseCurrency?: boolean;
}
