import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_customerfeedbacksurvey entity type
 */
export interface msdyn_customerfeedbacksurvey {
  msdyn_customerfeedbacksurveyname?: string;
  timezoneruleversionnumber?: number;
  _createdby_value?: string;
  msdyn_customerfeedbacksurveyprovider?: number;
  _modifiedby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  utcconversiontimezonecode?: number;
  overriddencreatedon?: string;
  versionnumber?: number;
  createdon?: string;
  statecode?: number;
  componentstate?: number;
  _msdyn_microsoftcopilotstudiobot_value?: string;
  msdyn_customerfeedbackbotstatus?: number;
  statuscode?: number;
  modifiedon?: string;
  overwritetime?: string;
  _modifiedonbehalfby_value?: string;
  componentidunique?: string;
  _organizationid_value?: string;
  _createdonbehalfby_value?: string;
  ismanaged?: boolean;
  msdyn_customerfeedbacksurveyid?: string;
  solutionid?: string;
  msdyn_customconfig?: string;
  msdyn_customhosturl?: string;
  msdyn_customerfeedbacksurveyurl?: string;
  importsequencenumber?: number;
}
