import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocunredactedannotation entity type
 */
export interface msdyn_ocunredactedannotation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_transcriptid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_documentbody?: string;
  msdyn_filename?: string;
  msdyn_filepointer?: string;
  msdyn_filesize?: number;
  msdyn_isdocument?: boolean;
  msdyn_langid?: string;
  msdyn_mimetype?: string;
  msdyn_name?: string;
  msdyn_notetext?: string;
  msdyn_objectid?: string;
  msdyn_objecttypecode?: string;
  msdyn_ocunredactedannotationid?: string;
  msdyn_prefix?: string;
  msdyn_sourceannotationid?: string;
  msdyn_stepid?: string;
  msdyn_storagepointer?: string;
  msdyn_subject?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
