import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_copilotskill entity type
 */
export interface msdyn_copilotskill {
  statuscode: number;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  versionnumber: number;
  solutionid: string;
  utcconversiontimezonecode: number;
  statecode: number;
  iscustomizable: BooleanManagedProperty;
  _createdonbehalfby_value: string;
  _createdby_value: string;
  _modifiedby_value: string;
  msdyn_featureconfiguration: string;
  createdon: string;
  componentidunique: string;
  modifiedon: string;
  msdyn_copilotskillid: string;
  importsequencenumber: number;
  ismanaged: boolean;
  msdyn_name: string;
  overriddencreatedon: string;
  componentstate: number;
  overwritetime: string;
  msdyn_uniquename: string;
  _organizationid_value: string;
}
