import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_casefollowupandclosureconfiguration entity type
 */
export interface msdyn_casefollowupandclosureconfiguration {
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
  msdyn_activationmode?: number;
  msdyn_casefollowupandclosureconfigurationid?: string;
  msdyn_caseresolutionattributes?: string;
  msdyn_closureemailtemplate_closed?: string;
  msdyn_closureemailtemplate_resolved?: string;
  msdyn_closurestatusreason?: number;
  msdyn_conditionname?: string;
  msdyn_conditionxml?: string;
  msdyn_enablecaseresolutionprediction?: boolean;
  msdyn_followupemailattributes?: string;
  msdyn_followupemailtemplates?: string;
  msdyn_followuptrigger?: string;
  msdyn_followupwaittimes?: string;
  msdyn_incidententityname?: string;
  msdyn_isdirectinvocationenabled?: boolean;
  msdyn_isfullautonomous?: boolean;
  msdyn_name?: string;
  msdyn_negativeresponsetargetstatus?: number;
  msdyn_numoffollowups?: number;
  msdyn_preresolutionperiod?: number;
  msdyn_ruleorder?: number;
  msdyn_stopmonitoringonoutofoffice?: boolean;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
