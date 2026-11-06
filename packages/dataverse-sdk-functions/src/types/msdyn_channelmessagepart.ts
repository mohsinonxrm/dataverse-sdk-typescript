import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelmessagepart entity type
 */
export interface msdyn_channelmessagepart {
  createdon?: string;
  _owningteam_value?: string;
  _ownerid_value?: string;
  msdyn_channelmessagepartid?: string;
  _createdonbehalfby_value?: string;
  msdyn_minvalue?: number;
  statecode?: number;
  modifiedon?: string;
  msdyn_isrequired?: boolean;
  _owninguser_value?: string;
  solutionid?: string;
  msdyn_type?: number;
  componentidunique?: string;
  msdyn_description?: string;
  importsequencenumber?: number;
  ismanaged?: boolean;
  _owningbusinessunit_value?: string;
  timezoneruleversionnumber?: number;
  msdyn_displayname?: string;
  _createdby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  overwritetime?: string;
  msdyn_order?: number;
  componentstate?: number;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  _msdyn_channeldefinitionid_value?: string;
  msdyn_entityviewid?: string;
  statuscode?: number;
  msdyn_maxvalue?: number;
  msdyn_options?: string;
  msdyn_name?: string;
  msdyn_entityname?: string;
  overriddencreatedon?: string;
  msdyn_maxlength?: number;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
}
