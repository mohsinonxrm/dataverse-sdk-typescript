import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_GetRelatedOpportunitiesForOpptyResearchResponse complex type
 */
export interface msdyn_GetRelatedOpportunitiesForOpptyResearchResponse {
  msdyn_Owner: EntityReference | AnyEntityPayload;
  msdyn_RelatedOpportunities?: Record<string, unknown>[];
}
