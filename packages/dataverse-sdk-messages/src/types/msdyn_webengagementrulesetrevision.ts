import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_webengagementrulesetrevision entity type
 */
export interface msdyn_webengagementrulesetrevision {
  componentstate?: number;
  _createdby_value?: string;
  modifiedon?: string;
  timezoneruleversionnumber?: number;
  msdyn_published?: boolean;
  _msdyn_webengagementruleset_value?: string;
  _createdonbehalfby_value?: string;
  ismanaged?: boolean;
  overriddencreatedon?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_name?: string;
  msdyn_description?: string;
  _ownerid_value?: string;
  componentidunique?: string;
  statecode?: number;
  solutionid?: string;
  msdyn_webengagementrulesetrevisionid?: string;
  statuscode?: number;
  overwritetime?: string;
  createdon?: string;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  _owningbusinessunit_value?: string;
  msdyn_version?: string;
  _owninguser_value?: string;
  importsequencenumber?: number;
  _owningteam_value?: string;
}
