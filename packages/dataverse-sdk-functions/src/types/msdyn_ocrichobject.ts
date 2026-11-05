import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocrichobject entity type
 */
export interface msdyn_ocrichobject {
  msdyn_objectjson?: string;
  componentstate?: number;
  _createdby_value?: string;
  msdyn_description?: string;
  msdyn_objectjsonfile?: string;
  iscustomizable?: BooleanManagedProperty;
  createdon?: string;
  versionnumber?: number;
  importsequencenumber?: number;
  solutionid?: string;
  utcconversiontimezonecode?: number;
  msdyn_ocrichobjecttype?: number;
  msdyn_streamsource?: number;
  _owningteam_value?: string;
  msdyn_objectjsonfile_name?: string;
  _ownerid_value?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  _modifiedonbehalfby_value?: string;
  componentidunique?: string;
  statecode?: number;
  statuscode?: number;
  overwritetime?: string;
  _owninguser_value?: string;
  timezoneruleversionnumber?: number;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  ismanaged?: boolean;
  msdyn_ocrichobjectgroupid?: string;
  _owningbusinessunit_value?: string;
  msdyn_allowagenttoedit?: boolean;
  msdyn_ocrichobjectid?: string;
  modifiedon?: string;
  msdyn_locale?: number;
}
