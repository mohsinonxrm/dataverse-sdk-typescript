import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_searchconfiguration entity type
 */
export interface msdyn_searchconfiguration {
  timezoneruleversionnumber: number;
  solutionid: string;
  _owninguser_value: string;
  modifiedon: string;
  versionnumber: number;
  msdyn_configblob: string;
  importsequencenumber: number;
  _createdby_value: string;
  statuscode: number;
  iscustomizable: BooleanManagedProperty;
  createdon: string;
  _ownerid_value: string;
  msdyn_name: string;
  _owningteam_value: string;
  componentidunique: string;
  _createdonbehalfby_value: string;
  msdyn_searchconfigurationid: string;
  componentstate: number;
  utcconversiontimezonecode: number;
  statecode: number;
  ismanaged: boolean;
  overriddencreatedon: string;
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  overwritetime: string;
}
