import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * botcomponent entity type
 */
export interface botcomponent {
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  componenttype: number;
  data: string;
  schemaname: string;
  content: string;
  statecode: number;
  category: string;
  _parentbotcomponentcollectionid_value: string;
  language: number;
  iconurl: string;
  _modifiedby_value: string;
  solutionid: string;
  versionnumber: number;
  _createdonbehalfby_value: string;
  componentidunique: string;
  accentcolor: string;
  _parentbotcomponentid_value: string;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
  name: string;
  componentstate: number;
  filedata_name: string;
  helplink: string;
  _parentbotid_value: string;
  createdon: string;
  filedata: string;
  timezoneruleversionnumber: number;
  description: string;
  reusepolicy: number;
  ismanaged: boolean;
  dependencies: string;
  canmodifystate: boolean;
  _ownerid_value: string;
  _owningteam_value: string;
  _owningbusinessunit_value: string;
  overwritetime: string;
  overriddencreatedon: string;
  statuscode: number;
  modifiedon: string;
  _owninguser_value: string;
  botcomponentid: string;
  _createdby_value: string;
}
