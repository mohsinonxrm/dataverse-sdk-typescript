import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_globalrulesetconfiguration entity type
 */
export interface msdyn_globalrulesetconfiguration {
  _modifiedby_value: string;
  msdyn_globalrulesetconfigurationid: string;
  msdyn_ruletype: number;
  componentstate: number;
  overwritetime: string;
  versionnumber: number;
  solutionid: string;
  componentidunique: string;
  overriddencreatedon: string;
  _ownerid_value: string;
  _msdyn_decisionrulesetid_value: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_name: string;
  _modifiedonbehalfby_value: string;
  _createdby_value: string;
  ismanaged: boolean;
  _createdonbehalfby_value: string;
  statuscode: number;
  statecode: number;
  importsequencenumber: number;
  _owningbusinessunit_value: string;
  _owninguser_value: string;
  modifiedon: string;
  createdon: string;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
}
