import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotscenariosetting entity type
 */
export interface msdyn_copilotscenariosetting {
  timezoneruleversionnumber: number;
  componentstate: number;
  msdyn_name: string;
  componentidunique: string;
  _organizationid_value: string;
  statuscode: number;
  createdon: string;
  _createdonbehalfby_value: string;
  msdyn_copilotscenariosettingid: string;
  versionnumber: number;
  utcconversiontimezonecode: number;
  msdyn_prioritizationcolumns: string;
  msdyn_prioritizationprompt: string;
  overwritetime: string;
  iscustomizable: BooleanManagedProperty;
  statecode: number;
  solutionid: string;
  msdyn_admininstructions: string;
  _modifiedby_value: string;
  msdyn_showdefaultaifields: boolean;
  _modifiedonbehalfby_value: string;
  msdyn_prioritizationfetchxml: string;
  modifiedon: string;
  overriddencreatedon: string;
  importsequencenumber: number;
  ismanaged: boolean;
  _createdby_value: string;
  msdyn_scenario: number;
}
