import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_swarmrole entity type
 */
export interface msdyn_swarmrole {
  statuscode: number;
  utcconversiontimezonecode: number;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  _modifiedonbehalfby_value: string;
  statecode: number;
  componentstate: number;
  msdyn_name: string;
  modifiedon: string;
  versionnumber: number;
  overwritetime: string;
  _createdonbehalfby_value: string;
  ismanaged: boolean;
  iscustomizable: BooleanManagedProperty;
  solutionid: string;
  _createdby_value: string;
  importsequencenumber: number;
  overriddencreatedon: string;
  _owninguser_value: string;
  _modifiedby_value: string;
  msdyn_roletype: number;
  msdyn_swarmroleid: string;
  msdyn_uniquename: string;
  _ownerid_value: string;
  componentidunique: string;
  createdon: string;
  _owningbusinessunit_value: string;
}
