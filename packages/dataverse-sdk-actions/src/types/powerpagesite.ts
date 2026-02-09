import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerpagesite entity type
 */
export interface powerpagesite {
  _modifiedby_value: string;
  powerpagesitetype: number;
  versionnumber: number;
  _ownerid_value: string;
  datamodelversion: string;
  _createdby_value: string;
  statecode: number;
  importsequencenumber: number;
  name: string;
  powerpagesiteid: string;
  overriddencreatedon: string;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  content: string;
  utcconversiontimezonecode: number;
  _createdonbehalfby_value: string;
  _modifiedonbehalfby_value: string;
  statuscode: number;
  ismanaged: boolean;
  overwritetime: string;
  componentidunique: string;
  createdon: string;
  primarydomainname: string;
  _owningteam_value: string;
  _owninguser_value: string;
  timezoneruleversionnumber: number;
  _owningbusinessunit_value: string;
  solutionid: string;
}
