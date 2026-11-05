import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_prod_actionoutputparameter_msdyn_pa entity type
 */
export interface msdyn_msdyn_prod_actionoutputparameter_msdyn_pa {
  msdyn_productivityactionoutputparameterid?: string;
  iscustomizable?: BooleanManagedProperty;
  solutionid?: string;
  componentstate?: number;
  ismanaged?: boolean;
  componentidunique?: string;
  msdyn_productivityparameterdefinitionid?: string;
  overwritetime?: string;
  msdyn_msdyn_prod_actionoutputparameter_msdyn_paid?: string;
  versionnumber?: number;
}
