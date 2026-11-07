import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * ComplexMoneyAttributeMetadata complex type
 */
export interface ComplexMoneyAttributeMetadata extends ComplexAttributeMetadata {
  CalculationOf?: string;
  FormulaDefinition?: string;
  ImeMode?: ImeMode;
  IsBaseCurrency?: boolean;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  PrecisionSource?: number;
  SourceTypeMask?: number;
}
