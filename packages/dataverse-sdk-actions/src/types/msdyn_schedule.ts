import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_schedule entity type
 */
export interface msdyn_schedule {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_callbackurl?: string;
  msdyn_isactive?: boolean;
  msdyn_nextrefreshtime?: string;
  msdyn_refentityname?: string;
  msdyn_referenceid?: string;
  msdyn_refreshpayload?: string;
  msdyn_refreshperiod?: string;
  msdyn_schedule?: string;
  msdyn_scheduledisabledreason?: string;
  msdyn_scheduleid?: string;
  msdyn_schedulerefreshtype?: number;
  msdyn_startdatetime?: string;
  msdyn_timebasedrefreshperiod?: string;
  msdyn_timezoneid?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
