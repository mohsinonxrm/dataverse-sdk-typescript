import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_paneconfig_msdyn_appconfig entity type
 */
export interface msdyn_msdyn_paneconfig_msdyn_appconfig {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_appconfigurationid?: string;
  msdyn_msdyn_paneconfig_msdyn_appconfigid?: string;
  msdyn_paneconfigurationid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
