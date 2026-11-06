import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * DoubleAttributeMetadata entity type
 */
export interface DoubleAttributeMetadata extends AttributeMetadata {
  ImeMode?: ImeMode;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
