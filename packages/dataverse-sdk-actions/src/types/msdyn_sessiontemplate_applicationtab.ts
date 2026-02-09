import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_sessiontemplate_applicationtab entity type
 */
export interface msdyn_sessiontemplate_applicationtab {
  msdyn_sessiontemplateid: string;
  ismanaged: boolean;
  componentidunique: string;
  overwritetime: string;
  componentstate: number;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_sessiontemplate_applicationtabid: string;
  solutionid: string;
  msdyn_applicationtabtemplateid: string;
}
