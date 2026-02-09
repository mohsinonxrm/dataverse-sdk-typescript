import type { AttributeTypeCode } from "./AttributeTypeCode.js";

/**
 * ManagedPropertyAttributeMetadata entity type
 */
export interface ManagedPropertyAttributeMetadata {
  ManagedPropertyLogicalName: string;
  ParentComponentType: number;
  ParentAttributeName: string;
  ValueAttributeTypeCode: AttributeTypeCode;
}
