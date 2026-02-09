import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_surveysetting entity type
 */
export interface msdyn_surveysetting {
  _msdyn_survey_value: string;
  _createdby_value: string;
  ismanaged: boolean;
  overwritetime: string;
  versionnumber: number;
  msdyn_emailtemplate: string;
  overriddencreatedon: string;
  msdyn_surveysettingid: string;
  importsequencenumber: number;
  _modifiedby_value: string;
  msdyn_casesurveyurl: string;
  _msdyn_customerfeedbacksurvey_value: string;
  createdon: string;
  utcconversiontimezonecode: number;
  _createdonbehalfby_value: string;
  componentstate: number;
  statuscode: number;
  solutionid: string;
  msdyn_name: string;
  _organizationid_value: string;
  statecode: number;
  timezoneruleversionnumber: number;
  _modifiedonbehalfby_value: string;
  iscustomizable: BooleanManagedProperty;
  modifiedon: string;
  componentidunique: string;
}
