import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_oc entity type
 */
export interface msdyn_dataanalyticsreport_oc {
  iscustomizable: BooleanManagedProperty;
  statuscode: number;
  createdon: string;
  msdyn_dataanalyticsreport_ocid: string;
  versionnumber: number;
  _msdyn_datainsightsandanalyticsfeatureid_value: string;
  componentstate: number;
  _modifiedby_value: string;
  overwritetime: string;
  msdyn_displayorder: number;
  modifiedon: string;
  msdyn_dataanalyticsreportid: string;
  statecode: number;
  utcconversiontimezonecode: number;
  _createdby_value: string;
  ismanaged: boolean;
  msdyn_isvisible: boolean;
  msdyn_name: string;
  overriddencreatedon: string;
  importsequencenumber: number;
  componentidunique: string;
  _createdonbehalfby_value: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  _organizationid_value: string;
}
