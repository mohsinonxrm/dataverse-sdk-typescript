import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casetopicsummary entity type
 */
export interface msdyn_casetopicsummary {
  _organizationid_value: string;
  timezoneruleversionnumber: number;
  msdyn_name: string;
  componentidunique: string;
  modifiedon: string;
  statecode: number;
  msdyn_casetopicsummaryid: string;
  solutionid: string;
  createdon: string;
  iscustomizable: BooleanManagedProperty;
  _modifiedonbehalfby_value: string;
  _createdby_value: string;
  _modifiedby_value: string;
  msdyn_casecount: number;
  msdyn_refreshtime: string;
  ismanaged: boolean;
  overwritetime: string;
  importsequencenumber: number;
  utcconversiontimezonecode: number;
  msdyn_casecoveragepercentage: number;
  versionnumber: number;
  statuscode: number;
  componentstate: number;
  msdyn_topiccount: number;
  _createdonbehalfby_value: string;
  overriddencreatedon: string;
}
