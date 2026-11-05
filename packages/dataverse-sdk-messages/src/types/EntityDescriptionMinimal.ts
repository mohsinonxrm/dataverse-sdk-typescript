import type { AttributeDescriptionMinimal } from "./AttributeDescriptionMinimal.js";

/**
 * EntityDescriptionMinimal complex type
 */
export interface EntityDescriptionMinimal {
  EntityName?: string;
  AttributeDescriptions?: AttributeDescriptionMinimal[];
}
