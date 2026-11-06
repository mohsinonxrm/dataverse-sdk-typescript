import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfig_msdyn_channelprovider entity type
 */
export interface msdyn_appconfig_msdyn_channelprovider {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_appconfig_msdyn_channelproviderid?: string;
  msdyn_appconfigurationid?: string;
  msdyn_channelproviderid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
