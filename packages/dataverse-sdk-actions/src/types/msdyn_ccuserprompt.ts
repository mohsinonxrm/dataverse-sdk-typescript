import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ccuserprompt entity type
 */
export interface msdyn_ccuserprompt {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_ccplaybookpolicyid_value?: string;
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
  msdyn_ccuserpromptid?: string;
  msdyn_channel?: string;
  msdyn_errormessage?: string;
  msdyn_exclusionlist?: string;
  msdyn_inclusionlist?: string;
  msdyn_name?: string;
  msdyn_prompt?: string;
  msdyn_promptstage?: number;
  msdyn_promptstagestatus?: number;
  msdyn_promptstatus?: number;
  msdyn_prompttemplate?: string;
  msdyn_workflowrule?: string;
  msdyn_workflowrule_name?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
