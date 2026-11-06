import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_templatecontextvariable_msdyn_template entity type
 */
export interface msdyn_templatecontextvariable_msdyn_template {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_templatecontextvariable_msdyn_templateid?: string;
  msdyn_templatecontextvariableid?: string;
  msdyn_templaterulesetid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
