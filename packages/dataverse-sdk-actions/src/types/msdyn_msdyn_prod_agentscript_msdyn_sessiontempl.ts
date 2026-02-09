import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_prod_agentscript_msdyn_sessiontempl entity type
 */
export interface msdyn_msdyn_prod_agentscript_msdyn_sessiontempl {
  msdyn_msdyn_prod_agentscript_msdyn_sessiontemplid: string;
  msdyn_productivityagentscriptid: string;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  ismanaged: boolean;
  solutionid: string;
  msdyn_sessiontemplateid: string;
  componentidunique: string;
  componentstate: number;
  versionnumber: number;
}
