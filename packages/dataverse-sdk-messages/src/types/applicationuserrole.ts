import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationuserrole entity type
 */
export interface applicationuserrole {
  solutionid: string;
  roleid: string;
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  versionnumber: number;
  componentidunique: string;
  ismanaged: boolean;
  overwritetime: string;
  applicationuserid: string;
  applicationuserroleid: string;
}
