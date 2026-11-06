import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * EntitySetting complex type
 */
export interface EntitySetting {
  ChildSettings?: EntitySetting[];
  Name?: string;
  Value: EntityReference | AnyEntityPayload;
}
