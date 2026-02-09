import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_pmprocessusersettings entity type
 */
export interface msdyn_pmprocessusersettings {
  _modifiedonbehalfby_value: string;
  _owningbusinessunit_value: string;
  msdyn_pmprocessusersettingsid: string;
  _msdyn_parenttask_value: string;
  componentstate: number;
  importsequencenumber: number;
  _modifiedby_value: string;
  _ownerid_value: string;
  msdyn_sendanalyticsemails: boolean;
  componentidunique: string;
  _owninguser_value: string;
  _createdonbehalfby_value: string;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  ismanaged: boolean;
  statuscode: number;
  overwritetime: string;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  modifiedon: string;
  _owningteam_value: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
  statecode: number;
  overriddencreatedon: string;
  solutionid: string;
}
