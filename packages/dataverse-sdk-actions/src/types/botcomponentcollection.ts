import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponentcollection entity type
 */
export interface botcomponentcollection {
  timezoneruleversionnumber: number;
  description: string;
  createdon: string;
  statuscode: number;
  _owningbusinessunit_value: string;
  overwritetime: string;
  _ownerid_value: string;
  modifiedon: string;
  configuration: string;
  ismanaged: boolean;
  componentidunique: string;
  overriddencreatedon: string;
  versionnumber: number;
  _owninguser_value: string;
  componentstate: number;
  botcomponentcollectionid: string;
  schemaname: string;
  solutionid: string;
  name: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedby_value: string;
  _createdby_value: string;
  _owningteam_value: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  statecode: number;
  utcconversiontimezonecode: number;
  _modifiedonbehalfby_value: string;
}
