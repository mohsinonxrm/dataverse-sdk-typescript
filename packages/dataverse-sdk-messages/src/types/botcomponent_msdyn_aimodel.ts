import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent_msdyn_aimodel entity type
 */
export interface botcomponent_msdyn_aimodel {
  botcomponent_msdyn_aimodelid?: string;
  botcomponentid?: string;
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_aimodelid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
