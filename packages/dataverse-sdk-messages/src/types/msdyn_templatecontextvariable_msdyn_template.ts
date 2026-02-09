import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_templatecontextvariable_msdyn_template entity type
 */
export interface msdyn_templatecontextvariable_msdyn_template {
  iscustomizable: BooleanManagedProperty;
  componentstate: number;
  componentidunique: string;
  msdyn_templatecontextvariable_msdyn_templateid: string;
  overwritetime: string;
  solutionid: string;
  msdyn_templatecontextvariableid: string;
  ismanaged: boolean;
  versionnumber: number;
  msdyn_templaterulesetid: string;
}
