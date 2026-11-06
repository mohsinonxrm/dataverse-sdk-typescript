import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationroles entity type
 */
export interface applicationroles {
  iscustomizable?: BooleanManagedProperty;
  applicationrolesid?: string;
  applicationid?: string;
  componentidunique?: string;
  componentstate?: number;
  overwritetime?: string;
  roleid?: string;
  versionnumber?: number;
  solutionid?: string;
  ismanaged?: boolean;
}
