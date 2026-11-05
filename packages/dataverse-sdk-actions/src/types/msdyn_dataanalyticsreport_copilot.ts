import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_copilot entity type
 */
export interface msdyn_dataanalyticsreport_copilot {
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  solutionid?: string;
  _createdby_value?: string;
  importsequencenumber?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  timezoneruleversionnumber?: number;
  statecode?: number;
  componentstate?: number;
  msdyn_name?: string;
  createdon?: string;
  versionnumber?: number;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  statuscode?: number;
  msdyn_isvisible?: boolean;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  modifiedon?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  msdyn_dataanalyticsreport_copilotid?: string;
  msdyn_dataanalyticsreportid?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  msdyn_displayorder?: number;
}
