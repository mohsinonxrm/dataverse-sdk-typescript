import type { AppointmentsToIgnore } from "./AppointmentsToIgnore.js";
import type { ConstraintRelation } from "./ConstraintRelation.js";
import type { ObjectiveRelation } from "./ObjectiveRelation.js";
import type { RequiredResource } from "./RequiredResource.js";
import type { SearchDirection } from "./SearchDirection.js";

/**
 * AppointmentRequest complex type
 */
export interface AppointmentRequest {
  AnchorOffset?: number;
  AppointmentsToIgnore?: AppointmentsToIgnore[];
  Constraints?: ConstraintRelation[];
  Direction?: SearchDirection;
  Duration?: number;
  NumberOfResults?: number;
  Objectives?: ObjectiveRelation[];
  RecurrenceDuration?: number;
  RecurrenceTimeZoneCode?: number;
  RequiredResources?: RequiredResource[];
  SearchRecurrenceRule?: string;
  SearchRecurrenceStart?: string;
  SearchWindowEnd?: string;
  SearchWindowStart?: string;
  ServiceId?: string;
  Sites?: string[];
  UserTimeZoneCode?: number;
}
