import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotscenariosetting entity type
 */
export interface msdyn_copilotscenariosetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_admininstructions?: string;
  msdyn_copilotscenariosettingid?: string;
  msdyn_name?: string;
  msdyn_prioritizationcolumns?: string;
  msdyn_prioritizationfetchxml?: string;
  msdyn_prioritizationprompt?: string;
  msdyn_scenario?: number;
  msdyn_showdefaultaifields?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
