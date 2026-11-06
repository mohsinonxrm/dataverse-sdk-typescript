import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_GetCustomActionParametersResponse complex type
 */
export interface msdyn_GetCustomActionParametersResponse {
  dynamicSchema?: string;
  customActionsParams: EntityReference | AnyEntityPayload;
}
