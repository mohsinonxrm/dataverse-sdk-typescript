import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * MoneyAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface MoneyAttributeMetadata extends AttributeMetadata {
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
