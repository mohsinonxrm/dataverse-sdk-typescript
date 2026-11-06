import type { email } from "./email.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./EntityPayload.js";

/**
 * BackgroundSendEmailResponse complex type
 */
export interface BackgroundSendEmailResponse {
  HasAttachments?: boolean[];
  EntityCollection?: (EntityReference | EntityPayload<email>)[];
}
