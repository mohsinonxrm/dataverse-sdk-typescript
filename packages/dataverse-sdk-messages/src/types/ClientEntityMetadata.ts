import type { ComplexEntityMetadata } from "./ComplexEntityMetadata.js";
import type { EntityClientSetting } from "./EntityClientSetting.js";

/**
 * ClientEntityMetadata complex type
 */
export interface ClientEntityMetadata {
  AttributeNames?: string[];
  EntityClientSetting?: EntityClientSetting;
  EntityMetadata?: ComplexEntityMetadata;
}
