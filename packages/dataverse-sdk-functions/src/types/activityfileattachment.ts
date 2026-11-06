import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * activityfileattachment entity type
 */
export interface activityfileattachment {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentid_value?: string;
  activityfileattachmentid?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  filecontent?: string;
  filecontent_name?: string;
  filename?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  objecttypecode?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
