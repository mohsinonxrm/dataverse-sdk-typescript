import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_salestag entity type
 */
export interface msdyn_salestag {
  statecode: number;
  msdyn_hierarchy: string;
  solutionid: string;
  utcconversiontimezonecode: number;
  _owninguser_value: string;
  ismanaged: boolean;
  _msdyn_parenttag_value: string;
  _owningteam_value: string;
  msdyn_tagfullname: string;
  msdyn_salestagid: string;
  _modifiedby_value: string;
  _owningbusinessunit_value: string;
  componentstate: number;
  statuscode: number;
  _createdby_value: string;
  _ownerid_value: string;
  modifiedon: string;
  createdon: string;
  timezoneruleversionnumber: number;
  componentidunique: string;
  overwritetime: string;
  versionnumber: number;
  overriddencreatedon: string;
  iscustomizable: BooleanManagedProperty;
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  msdyn_tagname: string;
}
