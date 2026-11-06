import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_SearchResourceAvailabilityResponse complex type
 */
export interface msdyn_SearchResourceAvailabilityResponse {
  TimeSlots?: Record<string, unknown>[];
  Resources?: Record<string, unknown>[];
  Related: EntityReference | AnyEntityPayload;
  Exceptions: EntityReference | AnyEntityPayload;
}
