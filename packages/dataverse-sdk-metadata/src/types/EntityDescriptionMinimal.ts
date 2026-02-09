import type { AttributeDescriptionMinimal } from "./AttributeDescriptionMinimal.js";

/**
 * EntityDescriptionMinimal
 */
export interface EntityDescriptionMinimal {
  EntityName?: string;
  AttributeDescriptions?: AttributeDescriptionMinimal[];
}
