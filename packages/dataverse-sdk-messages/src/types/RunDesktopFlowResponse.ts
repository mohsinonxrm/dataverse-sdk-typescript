import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * RunDesktopFlowResponse complex type
 */
export interface RunDesktopFlowResponse {
  flowsessionId?: string;
  licenseCheck: EntityReference | AnyEntityPayload;
}
