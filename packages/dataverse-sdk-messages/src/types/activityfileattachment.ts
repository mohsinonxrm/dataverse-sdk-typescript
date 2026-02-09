import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * activityfileattachment entity type
 */
export interface activityfileattachment {
  objecttypecode: string;
  timezoneruleversionnumber: number;
  _owningteam_value: string;
  filecontent_name: string;
  statuscode: number;
  componentidunique: string;
  overriddencreatedon: string;
  filecontent: string;
  componentstate: number;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  _createdonbehalfby_value: string;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  filename: string;
  _owninguser_value: string;
  _ownerid_value: string;
  _parentid_value: string;
  statecode: number;
  utcconversiontimezonecode: number;
  createdon: string;
  activityfileattachmentid: string;
  _owningbusinessunit_value: string;
  solutionid: string;
  versionnumber: number;
  importsequencenumber: number;
  ismanaged: boolean;
  _createdby_value: string;
  overwritetime: string;
}
