import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_schedule entity type
 */
export interface msdyn_schedule {
  msdyn_refreshpayload?: string;
  _createdonbehalfby_value?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_refreshperiod?: string;
  importsequencenumber?: number;
  msdyn_refentityname?: string;
  overriddencreatedon?: string;
  msdyn_timebasedrefreshperiod?: string;
  _modifiedonbehalfby_value?: string;
  msdyn_referenceid?: string;
  versionnumber?: number;
  _modifiedby_value?: string;
  modifiedon?: string;
  msdyn_scheduledisabledreason?: string;
  componentstate?: number;
  msdyn_isactive?: boolean;
  solutionid?: string;
  msdyn_timezoneid?: string;
  _ownerid_value?: string;
  msdyn_startdatetime?: string;
  statecode?: number;
  msdyn_callbackurl?: string;
  overwritetime?: string;
  timezoneruleversionnumber?: number;
  _owninguser_value?: string;
  msdyn_scheduleid?: string;
  ismanaged?: boolean;
  _owningbusinessunit_value?: string;
  msdyn_schedule?: string;
  componentidunique?: string;
  statuscode?: number;
  msdyn_nextrefreshtime?: string;
  _createdby_value?: string;
  utcconversiontimezonecode?: number;
  msdyn_schedulerefreshtype?: number;
  createdon?: string;
  _owningteam_value?: string;
}
