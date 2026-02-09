import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * environmentvariablevalue entity type
 */
export interface environmentvariablevalue {
  _createdonbehalfby_value: string;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  createdon: string;
  _createdby_value: string;
  ismanaged: boolean;
  schemaname: string;
  solutionid: string;
  environmentvariablevalueidunique: string;
  environmentvariablevalueid: string;
  _modifiedby_value: string;
  _ownerid_value: string;
  _owningteam_value: string;
  overwritetime: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  overriddencreatedon: string;
  value: string;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  introducedversion: string;
  versionnumber: number;
  statuscode: number;
  _environmentvariabledefinitionid_value: string;
  componentstate: number;
  _owningbusinessunit_value: string;
  _owninguser_value: string;
  statecode: number;
}
