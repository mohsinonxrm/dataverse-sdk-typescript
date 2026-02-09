import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentconfig entity type
 */
export interface msdyn_intentconfig {
  _ownerid_value: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  timezoneruleversionnumber: number;
  overriddencreatedon: string;
  statuscode: number;
  overwritetime: string;
  componentstate: number;
  createdon: string;
  _modifiedonbehalfby_value: string;
  _owningteam_value: string;
  ismanaged: boolean;
  _createdby_value: string;
  solutionid: string;
  _modifiedby_value: string;
  msdyn_intentconfigid: string;
  msdyn_entitytype: string;
  _msdyn_intentfamilyid_value: string;
  _owninguser_value: string;
  msdyn_name: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  componentidunique: string;
  statecode: number;
  iscustomizable: BooleanManagedProperty;
  msdyn_intentfieldspec: string;
  _owningbusinessunit_value: string;
  modifiedon: string;
}
