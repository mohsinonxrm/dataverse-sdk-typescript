import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_prod_actioninputparameter_msdyn_par entity type
 */
export interface msdyn_msdyn_prod_actioninputparameter_msdyn_par {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_msdyn_prod_actioninputparameter_msdyn_parid?: string;
  msdyn_productivityactioninputparameterid?: string;
  msdyn_productivityparameterdefinitionid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
