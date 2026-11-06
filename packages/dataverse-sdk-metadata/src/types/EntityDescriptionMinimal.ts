import type { AttributeDescriptionMinimal } from "./AttributeDescriptionMinimal.js";

/**
 * EntityDescriptionMinimal
 */
export interface EntityDescriptionMinimal {
  AttributeDescriptions?: AttributeDescriptionMinimal[];
  EntityName?: string;
}
