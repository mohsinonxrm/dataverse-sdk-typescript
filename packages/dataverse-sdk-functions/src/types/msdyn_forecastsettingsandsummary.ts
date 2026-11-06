import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_forecastsettingsandsummary entity type
 */
export interface msdyn_forecastsettingsandsummary {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_forecastjobstatus?: string;
  msdyn_forecastlastrun?: string;
  msdyn_forecastsettingsandsummaryid?: string;
  msdyn_historicalstartdate?: string;
  msdyn_holidaycalendarenabled?: boolean;
  msdyn_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
