import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_aidocumenttemplate entity type
 */
export interface msdyn_aidocumenttemplate {
  msdyn_uniquename?: string;
  componentstate?: number;
  _createdby_value?: string;
  timezoneruleversionnumber?: number;
  overriddencreatedon?: string;
  _ownerid_value?: string;
  importsequencenumber?: number;
  ismanaged?: boolean;
  msdyn_aidocumenttemplateid?: string;
  _owninguser_value?: string;
  _modifiedby_value?: string;
  msdyn_document_name?: string;
  componentidunique?: string;
  versionnumber?: number;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedonbehalfby_value?: string;
  _createdonbehalfby_value?: string;
  statuscode?: number;
  modifiedon?: string;
  msdyn_document?: string;
  createdon?: string;
  overwritetime?: string;
  statecode?: number;
  msdyn_mimetype?: string;
  _owningbusinessunit_value?: string;
  utcconversiontimezonecode?: number;
  _owningteam_value?: string;
  msdyn_filename?: string;
}
