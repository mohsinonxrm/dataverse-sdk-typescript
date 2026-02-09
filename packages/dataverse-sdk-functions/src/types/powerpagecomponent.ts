import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * powerpagecomponent entity type
 */
export interface powerpagecomponent {
  _powerpagesitelanguageid_value: string;
  statecode: number;
  _modifiedby_value: string;
  solutionid: string;
  timezoneruleversionnumber: number;
  filecontent_name: string;
  filecontent: string;
  _owningbusinessunit_value: string;
  _owninguser_value: string;
  iscustomizable: BooleanManagedProperty;
  versionnumber: number;
  content: string;
  searchcontent: string;
  ismanaged: boolean;
  powerpagecomponenttype: number;
  powerpagecomponentid: string;
  _owningteam_value: string;
  _modifiedonbehalfby_value: string;
  componentstate: number;
  overwritetime: string;
  _ownerid_value: string;
  importsequencenumber: number;
  _createdonbehalfby_value: string;
  createdon: string;
  componentidunique: string;
  utcconversiontimezonecode: number;
  name: string;
  _powerpagesiteid_value: string;
  _createdby_value: string;
  overriddencreatedon: string;
  modifiedon: string;
  statuscode: number;
}
