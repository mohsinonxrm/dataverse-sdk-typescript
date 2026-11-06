import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroupResponse complex type
 */
export interface msdyn_SearchResourceAvailabilityForRequirementGroupResponse {
  TimeSlots?: Record<string, unknown>[];
  Requirements?: Record<string, unknown>[];
  ProposalResourceAssignmentSets?: Record<string, unknown>[];
  PagingInfos: EntityReference | AnyEntityPayload;
}
