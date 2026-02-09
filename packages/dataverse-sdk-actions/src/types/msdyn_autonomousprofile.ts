import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_autonomousprofile entity type
 */
export interface msdyn_autonomousprofile {
  statecode: number;
  versionnumber: number;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  _owningbusinessunit_value: string;
  modifiedon: string;
  _ownerid_value: string;
  _modifiedby_value: string;
  importsequencenumber: number;
  createdon: string;
  componentstate: number;
  msdyn_autonomousprofileid: string;
  _modifiedonbehalfby_value: string;
  _msdyn_rolloutplanid_value: string;
  componentidunique: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  msdyn_name: string;
  overwritetime: string;
  _owninguser_value: string;
  solutionid: string;
  _createdonbehalfby_value: string;
  statuscode: number;
  ismanaged: boolean;
}
