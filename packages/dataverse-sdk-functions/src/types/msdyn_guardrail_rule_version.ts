import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_guardrail_rule_version entity type
 */
export interface msdyn_guardrail_rule_version {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_guardrail_ruleid_value?: string;
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
  msdyn_decisionthreshold?: number;
  msdyn_guardrail_rule_versionid?: string;
  msdyn_includeattachments?: boolean;
  msdyn_name?: string;
  msdyn_policystatement?: string;
  msdyn_prompt?: string;
  msdyn_ruledefinition?: string;
  msdyn_version?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
