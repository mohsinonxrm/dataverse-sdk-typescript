import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * applicationuser entity type
 */
export interface applicationuser {
  applicationuserid: string;
  ismanaged: boolean;
  versionnumber: number;
  iscustomizable: BooleanManagedProperty;
  overwritetime: string;
  componentstate: number;
  solutionid: string;
  overriddencreatedon: string;
  statecode: number;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  applicationname: string;
  _createdonbehalfby_value: string;
  _businessunitid_value: string;
  statuscode: number;
  utcconversiontimezonecode: number;
  canimpersonateassystemuser: boolean;
  _modifiedby_value: string;
  importsequencenumber: number;
  componentidunique: string;
  applicationid: string;
  createdon: string;
  _createdby_value: string;
  applicationtype: number;
  modifiedon: string;
}
