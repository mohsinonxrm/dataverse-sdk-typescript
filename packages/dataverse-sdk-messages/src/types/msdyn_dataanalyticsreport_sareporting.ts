import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_sareporting entity type
 */
export interface msdyn_dataanalyticsreport_sareporting {
  versionnumber: number;
  msdyn_isvisible: boolean;
  utcconversiontimezonecode: number;
  msdyn_dataanalyticsreport_sareportingid: string;
  msdyn_displayorder: number;
  overwritetime: string;
  iscustomizable: BooleanManagedProperty;
  overriddencreatedon: string;
  componentstate: number;
  _organizationid_value: string;
  createdon: string;
  statuscode: number;
  msdyn_dataanalyticsreportid: string;
  solutionid: string;
  _modifiedonbehalfby_value: string;
  _createdonbehalfby_value: string;
  ismanaged: boolean;
  _modifiedby_value: string;
  msdyn_name: string;
  _msdyn_datainsightsandanalyticsfeatureid_value: string;
  statecode: number;
  timezoneruleversionnumber: number;
  _createdby_value: string;
  modifiedon: string;
  componentidunique: string;
  importsequencenumber: number;
}
