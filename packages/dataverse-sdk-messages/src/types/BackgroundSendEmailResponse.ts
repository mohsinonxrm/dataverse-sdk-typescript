import type { email } from "./email.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { EntityPayload } from "./EntityPayload.js";

/**
 * BackgroundSendEmailResponse complex type
 */
export interface BackgroundSendEmailResponse {
  HasAttachments?: boolean[];
  EntityCollection?: (EntityReference | EntityPayload<email>)[];
}
