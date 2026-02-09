import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_forecastsettingsandsummary entity type
 */
export interface msdyn_forecastsettingsandsummary {
  iscustomizable: BooleanManagedProperty;
  _modifiedby_value: string;
  _modifiedonbehalfby_value: string;
  overriddencreatedon: string;
  timezoneruleversionnumber: number;
  statuscode: number;
  createdon: string;
  msdyn_forecastjobstatus: string;
  msdyn_historicalstartdate: string;
  statecode: number;
  msdyn_forecastsettingsandsummaryid: string;
  solutionid: string;
  ismanaged: boolean;
  componentidunique: string;
  modifiedon: string;
  versionnumber: number;
  msdyn_holidaycalendarenabled: boolean;
  componentstate: number;
  _createdonbehalfby_value: string;
  _msdyn_datainsightsandanalyticsfeatureid_value: string;
  utcconversiontimezonecode: number;
  _createdby_value: string;
  overwritetime: string;
  _organizationid_value: string;
  msdyn_name: string;
  importsequencenumber: number;
  msdyn_forecastlastrun: string;
}
