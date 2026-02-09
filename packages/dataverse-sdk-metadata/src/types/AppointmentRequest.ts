import type { AppointmentsToIgnore } from "./AppointmentsToIgnore.js";
import type { ConstraintRelation } from "./ConstraintRelation.js";
import type { ObjectiveRelation } from "./ObjectiveRelation.js";
import type { RequiredResource } from "./RequiredResource.js";
import type { SearchDirection } from "./SearchDirection.js";

/**
 * AppointmentRequest
 */
export interface AppointmentRequest {
  ServiceId?: string;
  AnchorOffset?: number;
  UserTimeZoneCode?: number;
  RecurrenceDuration?: number;
  RecurrenceTimeZoneCode?: number;
  AppointmentsToIgnore?: AppointmentsToIgnore[];
  RequiredResources?: RequiredResource[];
  SearchWindowStart?: string;
  SearchWindowEnd?: string;
  SearchRecurrenceStart?: string;
  SearchRecurrenceRule?: string;
  Duration?: number;
  Constraints?: ConstraintRelation[];
  Objectives?: ObjectiveRelation[];
  Direction?: SearchDirection;
  NumberOfResults?: number;
  Sites?: string[];
}
