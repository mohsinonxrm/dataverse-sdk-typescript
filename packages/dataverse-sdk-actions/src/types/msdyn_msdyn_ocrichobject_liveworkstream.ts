import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_ocrichobject_liveworkstream entity type
 */
export interface msdyn_msdyn_ocrichobject_liveworkstream {
  iscustomizable: BooleanManagedProperty;
  msdyn_ocrichobjectid: string;
  ismanaged: boolean;
  msdyn_msdyn_ocrichobject_liveworkstreamid: string;
  componentidunique: string;
  solutionid: string;
  overwritetime: string;
  versionnumber: number;
  componentstate: number;
  msdyn_liveworkstreamid: string;
}
