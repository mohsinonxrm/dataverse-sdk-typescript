import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_SearchResourceAvailabilityResponse complex type
 */
export interface msdyn_SearchResourceAvailabilityResponse {
  Exceptions: EntityReference | AnyEntityPayload;
  Related: EntityReference | AnyEntityPayload;
  Resources?: Record<string, unknown>[];
  TimeSlots?: Record<string, unknown>[];
}
