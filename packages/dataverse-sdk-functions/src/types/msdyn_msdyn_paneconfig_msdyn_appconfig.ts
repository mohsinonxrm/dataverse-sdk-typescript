import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_paneconfig_msdyn_appconfig entity type
 */
export interface msdyn_msdyn_paneconfig_msdyn_appconfig {
  ismanaged: boolean;
  solutionid: string;
  componentidunique: string;
  msdyn_appconfigurationid: string;
  componentstate: number;
  versionnumber: number;
  msdyn_msdyn_paneconfig_msdyn_appconfigid: string;
  msdyn_paneconfigurationid: string;
  overwritetime: string;
  iscustomizable: BooleanManagedProperty;
}
