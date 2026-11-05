import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsworkspace entity type
 */
export interface msdyn_dataanalyticsworkspace {
  utcconversiontimezonecode?: number;
  solutionid?: string;
  msdyn_name?: string;
  _createdonbehalfby_value?: string;
  versionnumber?: number;
  _owningbusinessunit_value?: string;
  timezoneruleversionnumber?: number;
  _modifiedonbehalfby_value?: string;
  overriddencreatedon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  componentstate?: number;
  overwritetime?: string;
  _owninguser_value?: string;
  _createdby_value?: string;
  msdyn_dataanalyticsworkspaceid?: string;
  msdyn_workspacetype?: number;
  componentidunique?: string;
  _ownerid_value?: string;
  msdyn_workspaceid?: string;
  statuscode?: number;
  modifiedon?: string;
  createdon?: string;
  statecode?: number;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  _msdyn_configuredby_value?: string;
  ismanaged?: boolean;
  _owningteam_value?: string;
}
