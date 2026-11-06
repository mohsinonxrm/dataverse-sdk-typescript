import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport entity type
 */
export interface msdyn_dataanalyticsreport {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
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
  msdyn_analyticschecksum?: number;
  msdyn_dataanalyticsreportid?: string;
  msdyn_datasetid?: string;
  msdyn_dataversereportid?: string;
  msdyn_displayname?: string;
  msdyn_displayorder?: number;
  msdyn_isenabled?: boolean;
  msdyn_name?: string;
  msdyn_provisionstatus?: boolean;
  msdyn_reportentityname?: string;
  msdyn_reportgroup?: string;
  msdyn_reportid?: string;
  msdyn_reportpage?: string;
  msdyn_reporttemplateid?: string;
  msdyn_workspaceid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
