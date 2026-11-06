import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_cefinsightdefinition_msdyn_cefinsighttag entity type
 */
export interface msdyn_cefinsightdefinition_msdyn_cefinsighttag {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_cefinsightdefinition_msdyn_cefinsighttagid?: string;
  msdyn_cefinsightdefinitionid?: string;
  msdyn_cefinsighttagid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
