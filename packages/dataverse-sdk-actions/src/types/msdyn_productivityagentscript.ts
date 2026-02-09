import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivityagentscript entity type
 */
export interface msdyn_productivityagentscript {
  _owninguser_value: string;
  _owningbusinessunit_value: string;
  overwritetime: string;
  versionnumber: number;
  componentstate: number;
  msdyn_uniquename: string;
  timezoneruleversionnumber: number;
  statuscode: number;
  statecode: number;
  ismanaged: boolean;
  modifiedon: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_language: number;
  _createdonbehalfby_value: string;
  _modifiedby_value: string;
  componentidunique: string;
  createdon: string;
  _createdby_value: string;
  msdyn_productivityagentscriptid: string;
  _ownerid_value: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  msdyn_name: string;
  _owningteam_value: string;
  msdyn_description: string;
  overriddencreatedon: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
}
