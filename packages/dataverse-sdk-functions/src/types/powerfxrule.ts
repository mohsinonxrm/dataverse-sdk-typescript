import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerfxrule entity type
 */
export interface powerfxrule {
  overriddencreatedon: string;
  versionnumber: number;
  powerfxruleid: string;
  dependencies: string;
  _createdby_value: string;
  ismanaged: boolean;
  solutionid: string;
  _createdonbehalfby_value: string;
  createdon: string;
  uniquename: string;
  statuscode: number;
  utcconversiontimezonecode: number;
  _owningteam_value: string;
  _owningbusinessunit_value: string;
  _modifiedby_value: string;
  messagename: string;
  entitylogicalname: string;
  iscustomizable: BooleanManagedProperty;
  name: string;
  importsequencenumber: number;
  modifiedon: string;
  expression: string;
  componentidunique: string;
  _owninguser_value: string;
  parameters: string;
  compiledexpression: string;
  _ownerid_value: string;
  componentstate: number;
  timezoneruleversionnumber: number;
  statecode: number;
  category: number;
  _modifiedonbehalfby_value: string;
  overwritetime: string;
}
