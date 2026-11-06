import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_email entity type
 */
export interface msdyn_dataanalyticsreport_email {
  ismanaged?: boolean;
  msdyn_name?: string;
  statuscode?: number;
  componentstate?: number;
  statecode?: number;
  msdyn_isvisible?: boolean;
  msdyn_dataanalyticsreportid?: string;
  utcconversiontimezonecode?: number;
  msdyn_displayorder?: number;
  overriddencreatedon?: string;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  timezoneruleversionnumber?: number;
  _organizationid_value?: string;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  importsequencenumber?: number;
  createdon?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  _createdby_value?: string;
  solutionid?: string;
  msdyn_dataanalyticsreport_emailid?: string;
  modifiedon?: string;
  componentidunique?: string;
  overwritetime?: string;
}
