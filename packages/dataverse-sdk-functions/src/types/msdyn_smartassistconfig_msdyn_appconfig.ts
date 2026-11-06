import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_smartassistconfig_msdyn_appconfig entity type
 */
export interface msdyn_smartassistconfig_msdyn_appconfig {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_appconfigurationid?: string;
  msdyn_smartassistconfig_msdyn_appconfigid?: string;
  msdyn_smartassistconfigid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
