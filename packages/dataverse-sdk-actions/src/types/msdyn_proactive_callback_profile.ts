import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_proactive_callback_profile entity type
 */
export interface msdyn_proactive_callback_profile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_bot_user_value?: string;
  _msdyn_callback_bot_user_value?: string;
  _msdyn_callback_phone_number_value?: string;
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
  msdyn_alternate_phone_number_terminating_key?: string;
  msdyn_ask_for_alternate_number?: boolean;
  msdyn_call_outside_queue_hours?: boolean;
  msdyn_callback_number_behavior?: number;
  msdyn_callback_offering_windows?: string;
  msdyn_callback_type?: number;
  msdyn_delay_between_retries?: number;
  msdyn_delay_between_retries_unit?: number;
  msdyn_duplicate_prevention_settings?: number;
  msdyn_duplicate_resolution_action?: number;
  msdyn_fallback_action?: number;
  msdyn_fallback_prompt_message?: string;
  msdyn_max_callback_limit?: number;
  msdyn_name?: string;
  msdyn_number_of_retries?: number;
  msdyn_proactive_callback_profileid?: string;
  msdyn_reattempt_rules?: string;
  msdyn_repeat_message_interval_seconds?: number;
  msdyn_wait_time_limit_seconds?: number;
  msdyn_wait_time_limit_unit?: number;
  msdyn_wait_time_window_seconds?: number;
  msdyn_wait_time_window_unit?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
