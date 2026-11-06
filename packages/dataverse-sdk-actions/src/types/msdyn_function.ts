import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_function entity type
 */
export interface msdyn_function {
  _customapi_value?: string;
  solutionid?: string;
  name?: string;
  importsequencenumber?: number;
  _owninguser_value?: string;
  overwritetime?: string;
  _owningteam_value?: string;
  utcconversiontimezonecode?: number;
  statecode?: number;
  createdon?: string;
  ismanaged?: boolean;
  componentstate?: number;
  _ownerid_value?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  _createdby_value?: string;
  statuscode?: number;
  _modifiedonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  componentidunique?: string;
  _modifiedby_value?: string;
  language?: number;
  _createdonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  versionnumber?: number;
  _owningbusinessunit_value?: string;
  msdyn_functionid?: string;
}
