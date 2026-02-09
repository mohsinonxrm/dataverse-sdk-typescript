import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationuserprofile entity type
 */
export interface applicationuserprofile {
  solutionid: string;
  overwritetime: string;
  componentidunique: string;
  applicationuserid: string;
  ismanaged: boolean;
  componentstate: number;
  applicationuserprofileid: string;
  iscustomizable: BooleanManagedProperty;
  fieldsecurityprofileid: string;
  versionnumber: number;
}
