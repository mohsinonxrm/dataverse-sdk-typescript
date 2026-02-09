import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfig_msdyn_channelprovider entity type
 */
export interface msdyn_appconfig_msdyn_channelprovider {
  msdyn_appconfigurationid: string;
  solutionid: string;
  componentidunique: string;
  componentstate: number;
  msdyn_appconfig_msdyn_channelproviderid: string;
  msdyn_channelproviderid: string;
  ismanaged: boolean;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
}
