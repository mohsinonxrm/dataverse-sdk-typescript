/**
 * msdyn_schedulingoptimizationplan entity type
 */
export interface msdyn_schedulingoptimizationplan {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_schedulinggoal_value?: string;
  _msdyn_schedulingscope_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_applymethod?: number;
  msdyn_consecutivefailurecount?: number;
  msdyn_description?: string;
  msdyn_isscheduled?: boolean;
  msdyn_lastruntime?: string;
  msdyn_name?: string;
  msdyn_nextruntime?: string;
  msdyn_optimizationrangefixedstart?: string;
  msdyn_planstatus?: number;
  msdyn_rangeduration?: number;
  msdyn_rangeoffset?: number;
  msdyn_rangereference?: number;
  msdyn_recurrencefrequency?: number;
  msdyn_recurrencehours?: string;
  msdyn_recurrenceinterval?: number;
  msdyn_recurrenceminutes?: string;
  msdyn_recurrencestarttime?: string;
  msdyn_recurrencetimezone?: number;
  msdyn_recurrenceweekdays?: string;
  msdyn_schedulevalidto?: string;
  msdyn_schedulingoptimizationplanid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
