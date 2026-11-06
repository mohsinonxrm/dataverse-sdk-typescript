import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfiguration_sessiontemplate entity type
 */
export interface msdyn_appconfiguration_sessiontemplate {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_appconfiguration_sessiontemplateid?: string;
  msdyn_appconfigurationid?: string;
  msdyn_sessiontemplateid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
