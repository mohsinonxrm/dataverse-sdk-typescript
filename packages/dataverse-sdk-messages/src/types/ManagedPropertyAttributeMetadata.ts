import type { AttributeMetadata } from "./AttributeMetadata.js";
import type { AttributeTypeCode } from "./AttributeTypeCode.js";

/**
 * ManagedPropertyAttributeMetadata entity type
 */
export interface ManagedPropertyAttributeMetadata extends AttributeMetadata {
  ManagedPropertyLogicalName?: string;
  ParentComponentType?: number;
  ParentAttributeName?: string;
  ValueAttributeTypeCode: AttributeTypeCode;
}
