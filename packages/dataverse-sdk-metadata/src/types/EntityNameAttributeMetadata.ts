import type { EnumAttributeMetadata } from "./EnumAttributeMetadata.js";

/**
 * EntityNameAttributeMetadata
 * Extends: EnumAttributeMetadata
 */
export interface EntityNameAttributeMetadata extends EnumAttributeMetadata {
  IsEntityReferenceStored: boolean;
}
