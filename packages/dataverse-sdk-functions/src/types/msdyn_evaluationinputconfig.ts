import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationinputconfig entity type
 */
export interface msdyn_evaluationinputconfig {
  msdyn_isbulkenabled: boolean;
  versionnumber: number;
  msdyn_evaluatedentity: string;
  iscustomizable: BooleanManagedProperty;
  timezoneruleversionnumber: number;
  overwritetime: string;
  overriddencreatedon: string;
  _modifiedby_value: string;
  ismanaged: boolean;
  msdyn_inputconfig: string;
  _createdby_value: string;
  msdyn_evaluationinputconfigid: string;
  msdyn_provisioningstatus: number;
  solutionid: string;
  utcconversiontimezonecode: number;
  componentidunique: string;
  importsequencenumber: number;
  componentstate: number;
  _createdonbehalfby_value: string;
  statecode: number;
  statuscode: number;
  msdyn_name: string;
  _organizationid_value: string;
  _modifiedonbehalfby_value: string;
  createdon: string;
  modifiedon: string;
}
