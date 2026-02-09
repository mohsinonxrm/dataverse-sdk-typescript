import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { OptionSetMetadata } from "./OptionSetMetadata.js";

/**
 * EnumAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface EnumAttributeMetadata extends AttributeMetadata {
  DefaultFormValue?: number;
  OptionSet?: OptionSetMetadata;
  GlobalOptionSet?: OptionSetMetadata;
}
