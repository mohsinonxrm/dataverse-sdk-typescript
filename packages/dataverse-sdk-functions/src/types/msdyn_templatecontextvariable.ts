import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_templatecontextvariable entity type
 */
export interface msdyn_templatecontextvariable {
  msdyn_datatype: number;
  uniquename: string;
  timezoneruleversionnumber: number;
  statuscode: number;
  statecode: number;
  createdon: string;
  utcconversiontimezonecode: number;
  _owninguser_value: string;
  solutionid: string;
  _owningteam_value: string;
  _modifiedby_value: string;
  versionnumber: number;
  msdyn_templatecontextvariableid: string;
  msdyn_name: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  overwritetime: string;
  componentidunique: string;
  overriddencreatedon: string;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  _createdby_value: string;
  _ownerid_value: string;
  msdyn_displayname: string;
  _owningbusinessunit_value: string;
  ismanaged: boolean;
}
