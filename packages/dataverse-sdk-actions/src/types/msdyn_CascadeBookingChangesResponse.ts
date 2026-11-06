import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./EntityPayload.js";

/**
 * msdyn_CascadeBookingChangesResponse complex type
 */
export interface msdyn_CascadeBookingChangesResponse {
  Booking: EntityReference | AnyEntityPayload;
  RelatedBookingsCreate?: Record<string, unknown>[];
  RelatedBookingsUpdate?: Record<string, unknown>[];
  RelatedBookingsDelete?: Record<string, unknown>[];
}
