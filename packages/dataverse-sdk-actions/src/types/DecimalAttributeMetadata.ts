import type { ImeMode } from "./ImeMode.js";

/**
 * DecimalAttributeMetadata entity type
 */
export interface DecimalAttributeMetadata {
  MaxValue: number;
  MinValue: number;
  Precision: number;
  ImeMode: ImeMode;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
