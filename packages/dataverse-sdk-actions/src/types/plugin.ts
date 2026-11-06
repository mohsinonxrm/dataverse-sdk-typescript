import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * plugin entity type
 */
export interface plugin {
  versionnumber?: number;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  utcconversiontimezonecode?: number;
  createdon?: string;
  language?: number;
  _modifiedonbehalfby_value?: string;
  importsequencenumber?: number;
  _owninguser_value?: string;
  _customapi_value?: string;
  modifiedon?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
  _sdkmessageprocessingstep_value?: string;
  _modifiedby_value?: string;
  _owningbusinessunit_value?: string;
  name?: string;
  timezoneruleversionnumber?: number;
  componentidunique?: string;
  overwritetime?: string;
  statuscode?: number;
  ismanaged?: boolean;
  pluginid?: string;
  overriddencreatedon?: string;
  _ownerid_value?: string;
  _owningteam_value?: string;
  _createdby_value?: string;
  triggertype?: number;
  componentstate?: number;
}
