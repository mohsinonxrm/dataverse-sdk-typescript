import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appconfiguration_applicationextension entity type
 */
export interface msdyn_appconfiguration_applicationextension {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_appconfiguration_applicationextensionid?: string;
  msdyn_appconfigurationid?: string;
  msdyn_applicationextensionid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
