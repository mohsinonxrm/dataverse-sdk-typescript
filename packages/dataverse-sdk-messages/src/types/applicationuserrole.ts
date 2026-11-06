import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationuserrole entity type
 */
export interface applicationuserrole {
  applicationuserid?: string;
  applicationuserroleid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  roleid?: string;
  solutionid?: string;
  versionnumber?: number;
}
