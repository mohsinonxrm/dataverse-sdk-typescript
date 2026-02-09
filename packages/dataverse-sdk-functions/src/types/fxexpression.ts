import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * fxexpression entity type
 */
export interface fxexpression {
  iscustomizable: BooleanManagedProperty;
  dependencies: string;
  expression: string;
  componentidunique: string;
  _owningbusinessunit_value: string;
  category: number;
  _ownerid_value: string;
  _createdonbehalfby_value: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  _createdby_value: string;
  compiledexpression: string;
  overwritetime: string;
  _modifiedonbehalfby_value: string;
  utcconversiontimezonecode: number;
  createdon: string;
  modifiedon: string;
  _owningteam_value: string;
  timezoneruleversionnumber: number;
  context: string;
  parameters: string;
  importsequencenumber: number;
  componentstate: number;
  versionnumber: number;
  overriddencreatedon: string;
  statecode: number;
  messagename: string;
  fxexpressionid: string;
  solutionid: string;
  _owninguser_value: string;
  statuscode: number;
  uniquename: string;
  name: string;
  entitylogicalname: string;
}
