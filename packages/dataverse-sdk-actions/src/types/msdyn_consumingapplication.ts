import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_consumingapplication entity type
 */
export interface msdyn_consumingapplication {
  msdyn_notificationurltemplate: string;
  versionnumber: number;
  msdyn_inboundurltemplate: string;
  msdyn_name: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  importsequencenumber: number;
  _owninguser_value: string;
  utcconversiontimezonecode: number;
  msdyn_consumingapplicationid: string;
  componentidunique: string;
  timezoneruleversionnumber: number;
  solutionid: string;
  overriddencreatedon: string;
  createdon: string;
  overwritetime: string;
  _owningbusinessunit_value: string;
  ismanaged: boolean;
  statecode: number;
  _owningteam_value: string;
  _modifiedby_value: string;
  _createdonbehalfby_value: string;
  componentstate: number;
  statuscode: number;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  _ownerid_value: string;
}
