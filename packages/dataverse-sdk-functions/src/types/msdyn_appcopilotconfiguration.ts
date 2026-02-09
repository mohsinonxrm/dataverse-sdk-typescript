import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_appcopilotconfiguration entity type
 */
export interface msdyn_appcopilotconfiguration {
  createdon: string;
  _createdonbehalfby_value: string;
  overwritetime: string;
  solutionid: string;
  overriddencreatedon: string;
  msdyn_name: string;
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  modifiedon: string;
  _createdby_value: string;
  componentidunique: string;
  versionnumber: number;
  _msdyn_appconfigurationid_value: string;
  msdyn_enabled: boolean;
  statecode: number;
  _organizationid_value: string;
  ismanaged: boolean;
  msdyn_appcopilotconfigurationid: string;
  _modifiedonbehalfby_value: string;
  componentstate: number;
  _modifiedby_value: string;
  importsequencenumber: number;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  msdyn_copilotfeature: number;
}
