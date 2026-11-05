import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerpagesite_dvtablesearch entity type
 */
export interface powerpagesite_dvtablesearch {
  componentidunique?: string;
  solutionid?: string;
  powerpagesiteid?: string;
  componentstate?: number;
  overwritetime?: string;
  powerpagesite_dvtablesearchid?: string;
  versionnumber?: number;
  ismanaged?: boolean;
  dvtablesearchid?: string;
  iscustomizable?: BooleanManagedProperty;
}
