import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * duplicaterule entity type
 */
export interface duplicaterule {
  _ownerid_value: string;
  statuscode: number;
  iscasesensitive: boolean;
  ismanaged: boolean;
  modifiedon: string;
  baseentityname: string;
  solutionid: string;
  timezoneruleversionnumber: number;
  iscustomizable: BooleanManagedProperty;
  duplicateruleid: string;
  baseentitytypecode: number;
  _createdonbehalfby_value: string;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  matchingentitymatchcodetable: string;
  utcconversiontimezonecode: number;
  componentidunique: string;
  excludeinactiverecords: boolean;
  componentstate: number;
  _owninguser_value: string;
  statecode: number;
  name: string;
  matchingentityname: string;
  _owningbusinessunit_value: string;
  _createdby_value: string;
  createdon: string;
  description: string;
  matchingentitytypecode: number;
  _owningteam_value: string;
  uniquename: string;
  baseentitymatchcodetable: string;
  overwritetime: string;
}
