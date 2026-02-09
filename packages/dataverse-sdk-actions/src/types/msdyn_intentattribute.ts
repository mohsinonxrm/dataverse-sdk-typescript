import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intentattribute entity type
 */
export interface msdyn_intentattribute {
  componentstate: number;
  overriddencreatedon: string;
  msdyn_name: string;
  modifiedon: string;
  overwritetime: string;
  statuscode: number;
  msdyn_acronyms: string;
  solutionid: string;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  iscustomizable: BooleanManagedProperty;
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  _createdby_value: string;
  _createdonbehalfby_value: string;
  _owninguser_value: string;
  _modifiedonbehalfby_value: string;
  createdon: string;
  msdyn_source: number;
  versionnumber: number;
  ismanaged: boolean;
  msdyn_intentattributeid: string;
  msdyn_reviewstate: number;
  _msdyn_intentfamilyid_value: string;
  statecode: number;
  importsequencenumber: number;
  _ownerid_value: string;
}
