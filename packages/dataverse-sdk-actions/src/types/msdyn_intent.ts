import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_intent entity type
 */
export interface msdyn_intent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_intentharvesting_batchjobstatusid_value?: string;
  _msdyn_parentgroupid_value?: string;
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
  msdyn_description?: string;
  msdyn_harvestingsource?: number;
  msdyn_intent_agent_settings?: string;
  msdyn_intent_description?: string;
  msdyn_intentid?: string;
  msdyn_intentsolutionrate?: number;
  msdyn_intentstring?: string;
  msdyn_intentvolume?: number;
  msdyn_is_selfserve_enabled?: boolean;
  msdyn_isgroup?: boolean;
  msdyn_locale_code?: string;
  msdyn_name?: string;
  msdyn_occurrencecount?: number;
  msdyn_occurrencecount_last12months?: number;
  msdyn_occurrencecount_last30days?: number;
  msdyn_reviewstate?: number;
  msdyn_reviewstatesource?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
