import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_msdyn_aimodel entity type
 */
export interface botcomponent_msdyn_aimodel {
  ismanaged: boolean;
  msdyn_aimodelid: string;
  solutionid: string;
  versionnumber: number;
  componentstate: number;
  botcomponentid: string;
  iscustomizable: BooleanManagedProperty;
  componentidunique: string;
  botcomponent_msdyn_aimodelid: string;
  overwritetime: string;
}
