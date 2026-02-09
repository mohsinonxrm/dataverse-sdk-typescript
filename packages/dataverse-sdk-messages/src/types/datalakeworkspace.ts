import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakeworkspace entity type
 */
export interface datalakeworkspace {
  name: string;
  timezoneruleversionnumber: number;
  containerendpoint: string;
  ismanaged: boolean;
  _modifiedonbehalfby_value: string;
  _organizationid_value: string;
  createdon: string;
  path: string;
  importsequencenumber: number;
  statecode: number;
  owningappid: string;
  isprivate: boolean;
  solutionid: string;
  _createdby_value: string;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  componentidunique: string;
  isdeepcopyenabled: boolean;
  _modifiedby_value: string;
  utcconversiontimezonecode: number;
  whitelistedappid: string;
  componentstate: number;
  datalakeworkspaceid: string;
  statuscode: number;
  overwritetime: string;
  iscustomercapacity: boolean;
  overriddencreatedon: string;
  datalakeworkspace_uniquename: string;
  _createdonbehalfby_value: string;
  tenantid: string;
  modifiedon: string;
}
