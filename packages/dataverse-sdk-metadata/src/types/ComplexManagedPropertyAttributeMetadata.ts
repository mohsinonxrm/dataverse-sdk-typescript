import type { AttributeTypeCode } from "./AttributeTypeCode.js";
import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";

/**
 * ComplexManagedPropertyAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexManagedPropertyAttributeMetadata extends ComplexAttributeMetadata {
  ManagedPropertyLogicalName?: string;
  ParentAttributeName?: string;
  ParentComponentType?: number;
  ValueAttributeTypeCode?: AttributeTypeCode;
}
