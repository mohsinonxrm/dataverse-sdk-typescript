import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_operatinghour entity type
 */
export interface msdyn_operatinghour {
  componentidunique?: string;
  statuscode?: number;
  importsequencenumber?: number;
  _owningteam_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  ismanaged?: boolean;
  msdyn_enablealldays?: boolean;
  msdyn_starttimestring?: string;
  solutionid?: string;
  overwritetime?: string;
  _owningbusinessunit_value?: string;
  msdyn_operatinghourid?: string;
  msdyn_endtimestring?: string;
  _createdby_value?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  modifiedon?: string;
  createdon?: string;
  versionnumber?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_description?: string;
  msdyn_timezone?: number;
  _owninguser_value?: string;
  componentstate?: number;
  msdyn_totalworkhours?: string;
  _organizationid_value?: string;
  _createdonbehalfby_value?: string;
  statecode?: number;
  msdyn_name?: string;
  msdyn_oc_daysofweek?: string;
  _modifiedby_value?: string;
  msdyn_calendarid?: string;
}
