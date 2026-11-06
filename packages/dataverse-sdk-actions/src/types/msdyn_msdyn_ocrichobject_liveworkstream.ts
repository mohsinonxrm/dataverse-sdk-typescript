import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_ocrichobject_liveworkstream entity type
 */
export interface msdyn_msdyn_ocrichobject_liveworkstream {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_liveworkstreamid?: string;
  msdyn_msdyn_ocrichobject_liveworkstreamid?: string;
  msdyn_ocrichobjectid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
