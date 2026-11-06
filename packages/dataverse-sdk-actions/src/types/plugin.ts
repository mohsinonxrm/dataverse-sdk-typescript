import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * plugin entity type
 */
export interface plugin {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customapi_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _sdkmessageprocessingstep_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  language?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  pluginid?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  triggertype?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
