import type { AttributeTypeCode } from "./AttributeTypeCode.js";
import type { ComplexAttributeMetadata } from "./ComplexAttributeMetadata.js";

/**
 * ComplexManagedPropertyAttributeMetadata
 * Extends: ComplexAttributeMetadata
 */
export interface ComplexManagedPropertyAttributeMetadata extends ComplexAttributeMetadata {
  ManagedPropertyLogicalName?: string;
  ParentComponentType?: number;
  ParentAttributeName?: string;
  ValueAttributeTypeCode?: AttributeTypeCode;
}
