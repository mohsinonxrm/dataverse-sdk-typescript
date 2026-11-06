import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sessiontemplate_applicationtab entity type
 */
export interface msdyn_sessiontemplate_applicationtab {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_applicationtabtemplateid?: string;
  msdyn_sessiontemplate_applicationtabid?: string;
  msdyn_sessiontemplateid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
