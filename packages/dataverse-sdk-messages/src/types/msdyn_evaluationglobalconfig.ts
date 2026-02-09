import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_evaluationglobalconfig entity type
 */
export interface msdyn_evaluationglobalconfig {
  _owningbusinessunit_value: string;
  overwritetime: string;
  createdon: string;
  modifiedon: string;
  msdyn_thresholdvalue: number;
  msdyn_enableevalscoring: boolean;
  _ownerid_value: string;
  msdyn_evaluationglobalconfigid: string;
  _modifiedby_value: string;
  msdyn_name: string;
  _modifiedonbehalfby_value: string;
  msdyn_enablecase: boolean;
  _owninguser_value: string;
  timezoneruleversionnumber: number;
  componentstate: number;
  importsequencenumber: number;
  versionnumber: number;
  utcconversiontimezonecode: number;
  statecode: number;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  ismanaged: boolean;
  _createdonbehalfby_value: string;
  _owningteam_value: string;
  msdyn_enableconversation: boolean;
  msdyn_id: string;
  overriddencreatedon: string;
  solutionid: string;
  statuscode: number;
  componentidunique: string;
}
