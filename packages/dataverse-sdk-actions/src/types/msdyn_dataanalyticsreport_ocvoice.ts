import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_ocvoice entity type
 */
export interface msdyn_dataanalyticsreport_ocvoice {
  statuscode: number;
  _createdby_value: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  msdyn_name: string;
  _organizationid_value: string;
  importsequencenumber: number;
  _modifiedonbehalfby_value: string;
  timezoneruleversionnumber: number;
  msdyn_dataanalyticsreport_ocvoiceid: string;
  statecode: number;
  solutionid: string;
  iscustomizable: BooleanManagedProperty;
  msdyn_isvisible: boolean;
  versionnumber: number;
  createdon: string;
  msdyn_dataanalyticsreportid: string;
  msdyn_displayorder: number;
  overriddencreatedon: string;
  _createdonbehalfby_value: string;
  _msdyn_datainsightsandanalyticsfeatureid_value: string;
  utcconversiontimezonecode: number;
  modifiedon: string;
  componentstate: number;
  componentidunique: string;
  overwritetime: string;
}
