import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aiconfigurationsearch entity type
 */
export interface msdyn_aiconfigurationsearch {
  _msdyn_aiconfiguration_value: string;
  _owningbusinessunit_value: string;
  modifiedon: string;
  _owninguser_value: string;
  msdyn_name: string;
  ismanaged: boolean;
  createdon: string;
  statecode: number;
  _owningteam_value: string;
  solutionid: string;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
  msdyn_uniquename: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  overriddencreatedon: string;
  _msdyn_dvtablesearch_value: string;
  _modifiedonbehalfby_value: string;
  _createdby_value: string;
  timezoneruleversionnumber: number;
  componentstate: number;
  _ownerid_value: string;
  componentidunique: string;
  msdyn_aiconfigurationsearchid: string;
  statuscode: number;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
}
