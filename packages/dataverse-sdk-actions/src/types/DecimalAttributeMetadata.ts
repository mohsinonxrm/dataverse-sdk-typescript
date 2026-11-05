import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * DecimalAttributeMetadata entity type
 */
export interface DecimalAttributeMetadata extends AttributeMetadata {
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  ImeMode?: ImeMode;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
