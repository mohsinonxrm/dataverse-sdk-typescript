import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_masterentityroutingconfiguration entity type
 */
export interface msdyn_masterentityroutingconfiguration {
  msdyn_uniquename: string;
  createdon: string;
  ismanaged: boolean;
  versionnumber: number;
  utcconversiontimezonecode: number;
  _owninguser_value: string;
  importsequencenumber: number;
  overriddencreatedon: string;
  msdyn_name: string;
  _modifiedby_value: string;
  overwritetime: string;
  statecode: number;
  _owningbusinessunit_value: string;
  msdyn_entitylogicalname: string;
  componentidunique: string;
  statuscode: number;
  _createdonbehalfby_value: string;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  _ownerid_value: string;
  solutionid: string;
  _owningteam_value: string;
  msdyn_masterentityroutingconfigurationid: string;
  _msdyn_rulesetid_value: string;
  modifiedon: string;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  componentstate: number;
}
