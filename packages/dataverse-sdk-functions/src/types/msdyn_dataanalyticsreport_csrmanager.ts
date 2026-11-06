import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_csrmanager entity type
 */
export interface msdyn_dataanalyticsreport_csrmanager {
  modifiedon?: string;
  versionnumber?: number;
  statuscode?: number;
  msdyn_isvisible?: boolean;
  statecode?: number;
  msdyn_dataanalyticsreportid?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  _createdby_value?: string;
  componentidunique?: string;
  _modifiedonbehalfby_value?: string;
  utcconversiontimezonecode?: number;
  _modifiedby_value?: string;
  createdon?: string;
  _createdonbehalfby_value?: string;
  ismanaged?: boolean;
  overriddencreatedon?: string;
  _organizationid_value?: string;
  componentstate?: number;
  msdyn_displayorder?: number;
  msdyn_dataanalyticsreport_csrmanagerid?: string;
  solutionid?: string;
  importsequencenumber?: number;
  overwritetime?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
}
