import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_datainsightsandanalyticsfeature entity type
 */
export interface msdyn_datainsightsandanalyticsfeature {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_analyticschecksum?: number;
  msdyn_datainsightsandanalyticsfeatureid?: string;
  msdyn_datasourcemode?: number;
  msdyn_iscustomizationsupported?: boolean;
  msdyn_isdemoenabled?: boolean;
  msdyn_isenabled?: boolean;
  msdyn_lastaccesstime?: string;
  msdyn_lastprovisionsenttime?: string;
  msdyn_lastreportrefreshtime?: string;
  msdyn_name?: string;
  msdyn_provisionerrorcode?: string;
  msdyn_provisionstatus?: number;
  msdyn_provisionstatusdetail?: string;
  msdyn_provisionsubstatus?: string;
  msdyn_reporttype?: number;
  msdyn_schedule?: string;
  msdyn_templateid?: string;
  msdyn_timezonecode?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
