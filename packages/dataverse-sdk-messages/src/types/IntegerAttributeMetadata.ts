import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { IntegerFormat } from "./IntegerFormat.js";

/**
 * IntegerAttributeMetadata entity type
 */
export interface IntegerAttributeMetadata extends AttributeMetadata {
  Format?: IntegerFormat;
  MaxValue?: number;
  MinValue?: number;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
}
