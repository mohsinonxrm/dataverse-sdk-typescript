import type { EntityReference } from "../EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_SearchResourceAvailabilityForRequirementGroupResponse complex type
 */
export interface msdyn_SearchResourceAvailabilityForRequirementGroupResponse {
  PagingInfos: EntityReference | AnyEntityPayload;
  ProposalResourceAssignmentSets?: Record<string, unknown>[];
  Requirements?: Record<string, unknown>[];
  TimeSlots?: Record<string, unknown>[];
}
