import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfiguration_sessiontemplate entity type
 */
export interface msdyn_appconfiguration_sessiontemplate {
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  versionnumber?: number;
  msdyn_appconfiguration_sessiontemplateid?: string;
  ismanaged?: boolean;
  overwritetime?: string;
  msdyn_appconfigurationid?: string;
  solutionid?: string;
  msdyn_sessiontemplateid?: string;
}
