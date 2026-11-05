import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_smartassistconfig_msdyn_appconfig entity type
 */
export interface msdyn_smartassistconfig_msdyn_appconfig {
  overwritetime?: string;
  msdyn_smartassistconfigid?: string;
  iscustomizable?: BooleanManagedProperty;
  versionnumber?: number;
  ismanaged?: boolean;
  msdyn_appconfigurationid?: string;
  solutionid?: string;
  componentstate?: number;
  msdyn_smartassistconfig_msdyn_appconfigid?: string;
  componentidunique?: string;
}
