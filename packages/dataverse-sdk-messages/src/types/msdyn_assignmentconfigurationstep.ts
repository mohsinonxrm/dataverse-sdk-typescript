import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_assignmentconfigurationstep entity type
 */
export interface msdyn_assignmentconfigurationstep {
  _msdyn_rulesetid_value: string;
  msdyn_assignmentconfigurationstepid: string;
  _modifiedby_value: string;
  componentidunique: string;
  statuscode: number;
  componentstate: number;
  solutionid: string;
  _ownerid_value: string;
  versionnumber: number;
  overriddencreatedon: string;
  msdyn_type: number;
  _msdyn_assignmentconfigurationid_value: string;
  iscustomizable: BooleanManagedProperty;
  ismanaged: boolean;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  overwritetime: string;
  msdyn_isdefaultruleset: boolean;
  modifiedon: string;
  msdyn_uniquename: string;
  msdyn_name: string;
  _owningteam_value: string;
  _owninguser_value: string;
  msdyn_steporder: number;
  createdon: string;
  statecode: number;
  timezoneruleversionnumber: number;
  _createdby_value: string;
  _owningbusinessunit_value: string;
  _modifiedonbehalfby_value: string;
}
