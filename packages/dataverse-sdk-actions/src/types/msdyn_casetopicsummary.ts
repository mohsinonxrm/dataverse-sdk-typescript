import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casetopicsummary entity type
 */
export interface msdyn_casetopicsummary {
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
  msdyn_casecount?: number;
  msdyn_casecoveragepercentage?: number;
  msdyn_casetopicsummaryid?: string;
  msdyn_name?: string;
  msdyn_refreshtime?: string;
  msdyn_topiccount?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
