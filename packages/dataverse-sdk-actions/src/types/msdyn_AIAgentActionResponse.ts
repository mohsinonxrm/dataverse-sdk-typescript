import type { msdyn_aiagentstatus } from "./msdyn_aiagentstatus.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./EntityPayload.js";

/**
 * msdyn_AIAgentActionResponse complex type
 */
export interface msdyn_AIAgentActionResponse {
  Outcome?: string;
  Reason?: string;
  AIAgentStatus: EntityReference | EntityPayload<msdyn_aiagentstatus>;
}
