import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_mc entity type
 */
export interface msdyn_dataanalyticsreport_mc {
  statuscode?: number;
  componentstate?: number;
  componentidunique?: string;
  ismanaged?: boolean;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  versionnumber?: number;
  solutionid?: string;
  utcconversiontimezonecode?: number;
  overriddencreatedon?: string;
  modifiedon?: string;
  _modifiedonbehalfby_value?: string;
  _createdby_value?: string;
  overwritetime?: string;
  createdon?: string;
  msdyn_name?: string;
  msdyn_displayorder?: number;
  importsequencenumber?: number;
  statecode?: number;
  _createdonbehalfby_value?: string;
  msdyn_dataanalyticsreportid?: string;
  msdyn_dataanalyticsreport_mcid?: string;
  msdyn_isvisible?: boolean;
  _organizationid_value?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  timezoneruleversionnumber?: number;
}
