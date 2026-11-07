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
  GlobalOptionSet?: BooleanOptionSetMetadata;
  OptionSet?: BooleanOptionSetMetadata;
}
