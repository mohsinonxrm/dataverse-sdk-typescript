import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_guardrail_localized_policy entity type
 */
export interface msdyn_guardrail_localized_policy {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_guardrail_rule_versionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_guardrail_localized_policyid?: string;
  msdyn_languagecode?: number;
  msdyn_name?: string;
  msdyn_policystatement?: string;
  msdyn_ruledefinition?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
