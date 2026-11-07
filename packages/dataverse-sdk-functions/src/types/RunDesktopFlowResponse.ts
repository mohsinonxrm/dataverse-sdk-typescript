import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * RunDesktopFlowResponse complex type
 */
export interface RunDesktopFlowResponse {
  flowsessionId?: string;
  licenseCheck: EntityReference | AnyEntityPayload;
}
