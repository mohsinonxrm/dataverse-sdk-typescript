import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_forecast entity type
 */
export interface msdyn_dataanalyticsreport_forecast {
  msdyn_isvisible?: boolean;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  overwritetime?: string;
  _modifiedby_value?: string;
  _createdonbehalfby_value?: string;
  modifiedon?: string;
  timezoneruleversionnumber?: number;
  msdyn_dataanalyticsreportid?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  _createdby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  overriddencreatedon?: string;
  _organizationid_value?: string;
  msdyn_dataanalyticsreport_forecastid?: string;
  importsequencenumber?: number;
  msdyn_name?: string;
  versionnumber?: number;
  componentidunique?: string;
  ismanaged?: boolean;
  msdyn_displayorder?: number;
  createdon?: string;
  statuscode?: number;
  componentstate?: number;
  utcconversiontimezonecode?: number;
}
