import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * DoubleAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface DoubleAttributeMetadata extends AttributeMetadata {
  ImeMode?: ImeMode;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
