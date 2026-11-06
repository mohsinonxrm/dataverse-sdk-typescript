import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationroles entity type
 */
export interface applicationroles {
  applicationid?: string;
  applicationrolesid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  overwritetime?: string;
  roleid?: string;
  solutionid?: string;
  versionnumber?: number;
}
