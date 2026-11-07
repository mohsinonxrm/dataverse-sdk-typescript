import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * MoneyAttributeMetadata entity type
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
