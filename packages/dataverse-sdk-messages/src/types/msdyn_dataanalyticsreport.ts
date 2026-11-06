import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport entity type
 */
export interface msdyn_dataanalyticsreport {
  msdyn_displayname?: string;
  msdyn_reportid?: string;
  componentstate?: number;
  msdyn_displayorder?: number;
  _msdyn_datainsightsandanalyticsfeatureid_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_reporttemplateid?: string;
  msdyn_datasetid?: string;
  _owningbusinessunit_value?: string;
  msdyn_workspaceid?: string;
  msdyn_dataversereportid?: string;
  _owninguser_value?: string;
  _modifiedby_value?: string;
  importsequencenumber?: number;
  msdyn_isenabled?: boolean;
  _createdby_value?: string;
  msdyn_reportpage?: string;
  _modifiedonbehalfby_value?: string;
  versionnumber?: number;
  solutionid?: string;
  iscustomizable?: BooleanManagedProperty;
  statecode?: number;
  msdyn_reportgroup?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  msdyn_analyticschecksum?: number;
  overwritetime?: string;
  msdyn_reportentityname?: string;
  ismanaged?: boolean;
  statuscode?: number;
  _ownerid_value?: string;
  msdyn_name?: string;
  timezoneruleversionnumber?: number;
  _createdonbehalfby_value?: string;
  msdyn_provisionstatus?: boolean;
  componentidunique?: string;
  msdyn_dataanalyticsreportid?: string;
  createdon?: string;
  _owningteam_value?: string;
}
