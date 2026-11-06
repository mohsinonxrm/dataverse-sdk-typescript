import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_surveyquestion entity type
 */
export interface msdyn_surveyquestion {
  _ownerid_value?: string;
  msdyn_placeholdertext?: string;
  _createdonbehalfby_value?: string;
  importsequencenumber?: number;
  msdyn_name?: string;
  versionnumber?: number;
  utcconversiontimezonecode?: number;
  msdyn_answertype?: number;
  msdyn_ratingscale?: number;
  _owninguser_value?: string;
  _createdby_value?: string;
  _owningbusinessunit_value?: string;
  timezoneruleversionnumber?: number;
  msdyn_questiontext?: string;
  statecode?: number;
  iscustomizable?: BooleanManagedProperty;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _owningteam_value?: string;
  msdyn_surveyquestionid?: string;
  ismanaged?: boolean;
  modifiedon?: string;
  statuscode?: number;
  overwritetime?: string;
  _msdyn_liveworkstreamtochatquestion_value?: string;
  overriddencreatedon?: string;
  solutionid?: string;
  createdon?: string;
  componentidunique?: string;
  componentstate?: number;
}
