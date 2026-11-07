import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { ImeMode } from "./ImeMode.js";

/**
 * DecimalAttributeMetadata entity type
 */
export interface DecimalAttributeMetadata extends AttributeMetadata {
  FormulaDefinition?: string;
  ImeMode?: ImeMode;
  MaxValue?: number;
  MinValue?: number;
  Precision?: number;
  SourceTypeMask?: number;
}
