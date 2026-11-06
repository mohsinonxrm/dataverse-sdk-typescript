import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_operatinghour entity type
 */
export interface msdyn_operatinghour {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
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
  msdyn_calendarid?: string;
  msdyn_description?: string;
  msdyn_enablealldays?: boolean;
  msdyn_endtimestring?: string;
  msdyn_name?: string;
  msdyn_oc_daysofweek?: string;
  msdyn_operatinghourid?: string;
  msdyn_starttimestring?: string;
  msdyn_timezone?: number;
  msdyn_totalworkhours?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
