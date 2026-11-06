import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_msdyn_prod_agentscript_msdyn_sessiontempl entity type
 */
export interface msdyn_msdyn_prod_agentscript_msdyn_sessiontempl {
  componentidunique?: string;
  componentstate?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  msdyn_msdyn_prod_agentscript_msdyn_sessiontemplid?: string;
  msdyn_productivityagentscriptid?: string;
  msdyn_sessiontemplateid?: string;
  overwritetime?: string;
  solutionid?: string;
  versionnumber?: number;
}
