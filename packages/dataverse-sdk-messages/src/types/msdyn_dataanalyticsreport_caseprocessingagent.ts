import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_caseprocessingagent entity type
 */
export interface msdyn_dataanalyticsreport_caseprocessingagent {
  _organizationid_value?: string;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  _createdby_value?: string;
  msdyn_displayorder?: number;
  msdyn_dataanalyticsreportid?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  msdyn_name?: string;
  versionnumber?: number;
  modifiedon?: string;
  solutionid?: string;
  msdyn_dataanalyticsreport_caseprocessingagentid?: string;
  overwritetime?: string;
  overriddencreatedon?: string;
  statuscode?: number;
  createdon?: string;
  statecode?: number;
  componentstate?: number;
  importsequencenumber?: number;
  _createdonbehalfby_value?: string;
  componentidunique?: string;
  iscustomizable?: BooleanManagedProperty;
  timezoneruleversionnumber?: number;
  msdyn_isvisible?: boolean;
  ismanaged?: boolean;
  _modifiedonbehalfby_value?: string;
}
