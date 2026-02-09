import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_agentgroup entity type
 */
export interface msdyn_agentgroup {
  componentstate: number;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  statuscode: number;
  msdyn_agentgroupid: string;
  _modifiedby_value: string;
  msdyn_description: string;
  _createdby_value: string;
  solutionid: string;
  createdon: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  importsequencenumber: number;
  ismanaged: boolean;
  statecode: number;
  _msdyn_intentfamilyid_value: string;
  modifiedon: string;
  overwritetime: string;
  _ownerid_value: string;
  _owninguser_value: string;
  _createdonbehalfby_value: string;
  _owningteam_value: string;
  iscustomizable: BooleanManagedProperty;
  _owningbusinessunit_value: string;
  msdyn_name: string;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
}
