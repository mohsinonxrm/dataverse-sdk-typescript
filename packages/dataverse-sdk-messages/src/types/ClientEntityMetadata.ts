import type { ComplexEntityMetadata } from "./ComplexEntityMetadata.js";
import type { EntityClientSetting } from "./EntityClientSetting.js";

/**
 * ClientEntityMetadata complex type
 */
export interface ClientEntityMetadata {
  EntityMetadata: ComplexEntityMetadata;
  AttributeNames: string[];
  EntityClientSetting: EntityClientSetting;
}
