import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casefollowupandclosureconfiguration entity type
 */
export interface msdyn_casefollowupandclosureconfiguration {
  msdyn_followuptrigger?: string;
  msdyn_preresolutionperiod?: number;
  msdyn_conditionname?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_followupwaittimes?: string;
  statuscode?: number;
  iscustomizable?: BooleanManagedProperty;
  msdyn_ruleorder?: number;
  timezoneruleversionnumber?: number;
  componentstate?: number;
  _organizationid_value?: string;
  msdyn_conditionxml?: string;
  msdyn_name?: string;
  msdyn_activationmode?: number;
  msdyn_incidententityname?: string;
  overriddencreatedon?: string;
  createdon?: string;
  importsequencenumber?: number;
  statecode?: number;
  msdyn_followupemailtemplates?: string;
  msdyn_isfullautonomous?: boolean;
  msdyn_numoffollowups?: number;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  msdyn_followupemailattributes?: string;
  msdyn_caseresolutionattributes?: string;
  _modifiedby_value?: string;
  versionnumber?: number;
  msdyn_isdirectinvocationenabled?: boolean;
  overwritetime?: string;
  _createdonbehalfby_value?: string;
  solutionid?: string;
  _createdby_value?: string;
  componentidunique?: string;
  modifiedon?: string;
  msdyn_casefollowupandclosureconfigurationid?: string;
}
