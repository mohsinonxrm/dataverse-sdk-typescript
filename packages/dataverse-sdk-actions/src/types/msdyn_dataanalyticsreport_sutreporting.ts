import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_dataanalyticsreport_sutreporting entity type
 */
export interface msdyn_dataanalyticsreport_sutreporting {
  _createdonbehalfby_value: string;
  msdyn_dataanalyticsreport_sutreportingid: string;
  msdyn_dataanalyticsreportid: string;
  ismanaged: boolean;
  overriddencreatedon: string;
  _msdyn_datainsightsandanalyticsfeatureid_value: string;
  componentidunique: string;
  _modifiedby_value: string;
  versionnumber: number;
  createdon: string;
  solutionid: string;
  overwritetime: string;
  _createdby_value: string;
  timezoneruleversionnumber: number;
  msdyn_displayorder: number;
  statuscode: number;
  componentstate: number;
  utcconversiontimezonecode: number;
  msdyn_isvisible: boolean;
  modifiedon: string;
  _organizationid_value: string;
  _modifiedonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  importsequencenumber: number;
  msdyn_name: string;
  statecode: number;
}
