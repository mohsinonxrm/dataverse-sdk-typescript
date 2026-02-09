import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { BooleanOptionSetMetadata } from "./BooleanOptionSetMetadata.js";

/**
 * BooleanAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface BooleanAttributeMetadata extends AttributeMetadata {
  DefaultValue?: boolean;
  FormulaDefinition?: string;
  SourceTypeMask?: number;
  OptionSet?: BooleanOptionSetMetadata;
  GlobalOptionSet?: BooleanOptionSetMetadata;
}
