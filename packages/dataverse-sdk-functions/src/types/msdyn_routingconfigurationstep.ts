import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_routingconfigurationstep entity type
 */
export interface msdyn_routingconfigurationstep {
  msdyn_steporder: number;
  _owninguser_value: string;
  statuscode: number;
  importsequencenumber: number;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  statecode: number;
  componentidunique: string;
  msdyn_uniquename: string;
  _createdby_value: string;
  solutionid: string;
  _msdyn_rulesetid_value: string;
  _owningbusinessunit_value: string;
  iscustomizable: BooleanManagedProperty;
  utcconversiontimezonecode: number;
  msdyn_routingconfigurationstepid: string;
  msdyn_type: number;
  _modifiedby_value: string;
  overriddencreatedon: string;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  componentstate: number;
  ismanaged: boolean;
  msdyn_name: string;
  modifiedon: string;
  _owningteam_value: string;
  createdon: string;
  overwritetime: string;
  versionnumber: number;
  _msdyn_routingconfigurationid_value: string;
}
