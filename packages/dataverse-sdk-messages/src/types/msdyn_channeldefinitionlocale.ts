import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channeldefinitionlocale entity type
 */
export interface msdyn_channeldefinitionlocale {
  msdyn_localeid: number;
  ismanaged: boolean;
  componentstate: number;
  msdyn_channeldefinitionlocaleid: string;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  versionnumber: number;
  _owningbusinessunit_value: string;
  _createdby_value: string;
  overwritetime: string;
  statuscode: number;
  statecode: number;
  _modifiedonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  createdon: string;
  _ownerid_value: string;
  modifiedon: string;
  overriddencreatedon: string;
  _createdonbehalfby_value: string;
  _msdyn_channeldefinitionid_value: string;
  importsequencenumber: number;
  _owninguser_value: string;
  componentidunique: string;
  solutionid: string;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  msdyn_localecontent: string;
}
