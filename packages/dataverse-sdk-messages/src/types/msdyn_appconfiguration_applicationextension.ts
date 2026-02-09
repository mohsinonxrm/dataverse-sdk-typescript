import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfiguration_applicationextension entity type
 */
export interface msdyn_appconfiguration_applicationextension {
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  ismanaged: boolean;
  solutionid: string;
  componentidunique: string;
  msdyn_appconfiguration_applicationextensionid: string;
  msdyn_applicationextensionid: string;
  overwritetime: string;
  msdyn_appconfigurationid: string;
  componentstate: number;
}
