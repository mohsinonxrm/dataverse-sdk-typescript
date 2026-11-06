import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelmessagepart entity type
 */
export interface msdyn_channelmessagepart {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_channeldefinitionid_value?: string;
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
  msdyn_channelmessagepartid?: string;
  msdyn_description?: string;
  msdyn_displayname?: string;
  msdyn_entityname?: string;
  msdyn_entityviewid?: string;
  msdyn_isrequired?: boolean;
  msdyn_maxlength?: number;
  msdyn_maxvalue?: number;
  msdyn_minvalue?: number;
  msdyn_name?: string;
  msdyn_options?: string;
  msdyn_order?: number;
  msdyn_type?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
