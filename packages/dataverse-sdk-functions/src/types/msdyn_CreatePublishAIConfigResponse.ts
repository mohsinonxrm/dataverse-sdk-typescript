import type { msdyn_ocsimltraining } from "./msdyn_ocsimltraining.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { EntityPayload } from "./EntityPayload.js";

/**
 * msdyn_CreatePublishAIConfigResponse complex type
 */
export interface msdyn_CreatePublishAIConfigResponse {
  isUnpublish?: string;
  SkillIdentTraining: EntityReference | EntityPayload<msdyn_ocsimltraining>;
}
