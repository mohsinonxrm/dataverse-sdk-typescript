import type { AttributeTypeCode } from "./AttributeTypeCode.js";

/**
 * ComplexManagedPropertyAttributeMetadata complex type
 */
export interface ComplexManagedPropertyAttributeMetadata {
  ManagedPropertyLogicalName: string;
  ParentComponentType: number;
  ParentAttributeName: string;
  ValueAttributeTypeCode: AttributeTypeCode;
}
