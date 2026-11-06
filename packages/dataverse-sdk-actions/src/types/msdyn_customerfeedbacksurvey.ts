import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_customerfeedbacksurvey entity type
 */
export interface msdyn_customerfeedbacksurvey {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_microsoftcopilotstudiobot_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_customconfig?: string;
  msdyn_customerfeedbackbotstatus?: number;
  msdyn_customerfeedbacksurveyid?: string;
  msdyn_customerfeedbacksurveyname?: string;
  msdyn_customerfeedbacksurveyprovider?: number;
  msdyn_customerfeedbacksurveyurl?: string;
  msdyn_customhosturl?: string;
  msdyn_directsave?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
