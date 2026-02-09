import type { IntegerFormat } from "./IntegerFormat.js";

/**
 * IntegerAttributeMetadata entity type
 */
export interface IntegerAttributeMetadata {
  Format: IntegerFormat;
  MaxValue: number;
  MinValue: number;
  FormulaDefinition: string;
  SourceTypeMask: number;
}
