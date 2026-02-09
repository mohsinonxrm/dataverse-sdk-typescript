import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * datalakeworkspacepermission entity type
 */
export interface datalakeworkspacepermission {
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  canread: boolean;
  whitelistedappid: string;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  utcconversiontimezonecode: number;
  overwritetime: string;
  tenantid: string;
  _workspaceid_value: string;
  overriddencreatedon: string;
  canexecute: boolean;
  componentstate: number;
  datalakeworkspacepermission_uniquename: string;
  componentidunique: string;
  _modifiedby_value: string;
  createdon: string;
  _organizationid_value: string;
  canwrite: boolean;
  datalakeworkspacepermissionid: string;
  _createdonbehalfby_value: string;
  versionnumber: number;
  statuscode: number;
  solutionid: string;
  ismanaged: boolean;
  modifiedon: string;
  statecode: number;
  appid: string;
  _createdby_value: string;
  name: string;
}
