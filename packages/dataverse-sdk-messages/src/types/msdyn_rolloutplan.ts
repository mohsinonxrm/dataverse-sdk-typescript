import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_rolloutplan entity type
 */
export interface msdyn_rolloutplan {
  overwritetime?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  versionnumber?: number;
  msdyn_description?: string;
  iscustomizable?: BooleanManagedProperty;
  utcconversiontimezonecode?: number;
  modifiedon?: string;
  ismanaged?: boolean;
  statecode?: number;
  _createdby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  timezoneruleversionnumber?: number;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  msdyn_scheduledutc?: string;
  importsequencenumber?: number;
  msdyn_name?: string;
  componentstate?: number;
  statuscode?: number;
  _owningteam_value?: string;
  msdyn_rolloutplanid?: string;
  _modifiedonbehalfby_value?: string;
  overriddencreatedon?: string;
  solutionid?: string;
  createdon?: string;
}
