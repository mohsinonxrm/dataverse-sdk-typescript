import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocrichobject entity type
 */
export interface msdyn_ocrichobject {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_allowagenttoedit?: boolean;
  msdyn_description?: string;
  msdyn_locale?: number;
  msdyn_name?: string;
  msdyn_objectjson?: string;
  msdyn_objectjsonfile?: string;
  msdyn_objectjsonfile_name?: string;
  msdyn_ocrichobjectgroupid?: string;
  msdyn_ocrichobjectid?: string;
  msdyn_ocrichobjecttype?: number;
  msdyn_streamsource?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
