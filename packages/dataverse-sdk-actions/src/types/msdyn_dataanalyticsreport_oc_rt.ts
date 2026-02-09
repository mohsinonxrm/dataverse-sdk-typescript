import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_oc_rt entity type
 */
export interface msdyn_dataanalyticsreport_oc_rt {
  solutionid: string;
  _createdby_value: string;
  timezoneruleversionnumber: number;
  msdyn_dataanalyticsreport_oc_rtid: string;
  msdyn_displayorder: number;
  _organizationid_value: string;
  _createdonbehalfby_value: string;
  importsequencenumber: number;
  msdyn_dataanalyticsreportid: string;
  overriddencreatedon: string;
  versionnumber: number;
  _modifiedby_value: string;
  createdon: string;
  componentstate: number;
  overwritetime: string;
  msdyn_name: string;
  statuscode: number;
  statecode: number;
  ismanaged: boolean;
  msdyn_isvisible: boolean;
  modifiedon: string;
  componentidunique: string;
  _msdyn_datainsightsandanalyticsfeatureid_value: string;
  _modifiedonbehalfby_value: string;
  utcconversiontimezonecode: number;
  iscustomizable: BooleanManagedProperty;
}
