import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_productivityparameterdefinition entity type
 */
export interface msdyn_productivityparameterdefinition {
  createdon: string;
  utcconversiontimezonecode: number;
  ismanaged: boolean;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  overwritetime: string;
  msdyn_productivityparameterdefinitionid: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_parametertype: string;
  overriddencreatedon: string;
  componentidunique: string;
  _owningbusinessunit_value: string;
  msdyn_name: string;
  msdyn_description: string;
  msdyn_uniquename: string;
  msdyn_displayname: string;
  _createdonbehalfby_value: string;
  msdyn_defaultvalue: string;
  statecode: number;
  _owninguser_value: string;
  componentstate: number;
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  _modifiedby_value: string;
  modifiedon: string;
  _createdby_value: string;
  statuscode: number;
  msdyn_jsonobjectstructure: string;
  _ownerid_value: string;
  solutionid: string;
  versionnumber: number;
}
