import type { ImeMode } from "./ImeMode.js";

/**
 * DoubleAttributeMetadata entity type
 */
export interface DoubleAttributeMetadata {
  ImeMode: ImeMode;
  MaxValue: number;
  MinValue: number;
  Precision: number;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
