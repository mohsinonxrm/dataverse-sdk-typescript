import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { AttributeTypeCode } from "./AttributeTypeCode.js";

/**
 * ManagedPropertyAttributeMetadata
 * Extends: AttributeMetadata
 */
export interface ManagedPropertyAttributeMetadata extends AttributeMetadata {
  ManagedPropertyLogicalName?: string;
  ParentAttributeName?: string;
  ParentComponentType?: number;
  ValueAttributeTypeCode: AttributeTypeCode;
}
