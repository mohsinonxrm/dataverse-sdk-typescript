import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * EntitySetting complex type
 */
export interface EntitySetting {
  Name?: string;
  ChildSettings?: EntitySetting[];
  Value: EntityReference | AnyEntityPayload;
}
