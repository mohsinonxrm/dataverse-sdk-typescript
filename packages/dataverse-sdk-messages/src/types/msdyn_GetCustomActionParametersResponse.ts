import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_GetCustomActionParametersResponse complex type
 */
export interface msdyn_GetCustomActionParametersResponse {
  dynamicSchema?: string;
  customActionsParams: EntityReference | AnyEntityPayload;
}
