import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationuserprofile entity type
 */
export interface applicationuserprofile {
  applicationuserid?: string;
  applicationuserprofileid?: string;
  componentidunique?: string;
  componentstate?: number;
  fieldsecurityprofileid?: string;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
