import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_proactive_engagement_global_comm_config entity type
 */
export interface msdyn_proactive_engagement_global_comm_config {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_comm_quiet_time_setting_alternate_value?: string;
  _msdyn_comm_quiet_time_setting_business_value?: string;
  _msdyn_comm_quiet_time_setting_home_value?: string;
  _msdyn_comm_quiet_time_setting_mobile_value?: string;
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
  msdyn_comm_frequency_limit_enabled?: boolean;
  msdyn_comm_max_deliverytask_frequency_per_day?: number;
  msdyn_comm_max_deliverytask_frequency_per_month?: number;
  msdyn_comm_max_deliverytask_frequency_per_week?: number;
  msdyn_comm_max_frequency_per_day?: number;
  msdyn_comm_max_frequency_per_month?: number;
  msdyn_comm_max_frequency_per_week?: number;
  msdyn_comm_max_phone_frequency_per_day?: number;
  msdyn_comm_max_phone_frequency_per_month?: number;
  msdyn_comm_max_phone_frequency_per_week?: number;
  msdyn_comm_quiet_times_enabled?: boolean;
  msdyn_comm_scheduling_enabled?: boolean;
  msdyn_name?: string;
  msdyn_phone_type_priority?: string;
  msdyn_proactive_engagement_global_comm_configid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
