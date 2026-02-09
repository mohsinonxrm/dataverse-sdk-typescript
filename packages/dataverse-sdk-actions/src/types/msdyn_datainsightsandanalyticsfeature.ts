import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_datainsightsandanalyticsfeature entity type
 */
export interface msdyn_datainsightsandanalyticsfeature {
  msdyn_datainsightsandanalyticsfeatureid: string;
  msdyn_lastprovisionsenttime: string;
  msdyn_provisionstatusdetail: string;
  solutionid: string;
  msdyn_datasourcemode: number;
  _modifiedonbehalfby_value: string;
  importsequencenumber: number;
  versionnumber: number;
  msdyn_isenabled: boolean;
  statecode: number;
  msdyn_templateid: string;
  _organizationid_value: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_lastreportrefreshtime: string;
  msdyn_isdemoenabled: boolean;
  modifiedon: string;
  msdyn_schedule: string;
  msdyn_timezonecode: number;
  msdyn_provisionerrorcode: string;
  msdyn_provisionstatus: number;
  overriddencreatedon: string;
  componentstate: number;
  overwritetime: string;
  _createdonbehalfby_value: string;
  msdyn_lastaccesstime: string;
  statuscode: number;
  componentidunique: string;
  utcconversiontimezonecode: number;
  msdyn_iscustomizationsupported: boolean;
  msdyn_name: string;
  timezoneruleversionnumber: number;
  _modifiedby_value: string;
  msdyn_reporttype: number;
  ismanaged: boolean;
  createdon: string;
  msdyn_analyticschecksum: number;
  msdyn_provisionsubstatus: string;
  _createdby_value: string;
}
