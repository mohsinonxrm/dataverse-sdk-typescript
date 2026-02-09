import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_prod_actioninputparameter_msdyn_par entity type
 */
export interface msdyn_msdyn_prod_actioninputparameter_msdyn_par {
  componentidunique: string;
  msdyn_productivityactioninputparameterid: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_msdyn_prod_actioninputparameter_msdyn_parid: string;
  ismanaged: boolean;
  componentstate: number;
  solutionid: string;
  versionnumber: number;
  msdyn_productivityparameterdefinitionid: string;
  overwritetime: string;
}
