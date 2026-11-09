/**
 * service entity type
 */
export interface service {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_requirementgroupid_value?: string;
  _organizationid_value?: string;
  _resourcespecid_value?: string;
  _strategyid_value?: string;
  anchoroffset?: number;
  calendarid?: string;
  createdon?: string;
  description?: string;
  duration?: number;
  granularity?: string;
  importsequencenumber?: number;
  initialstatuscode?: number;
  isschedulable?: boolean;
  isvisible?: boolean;
  modifiedon?: string;
  msdyn_SchedulingEngine?: number;
  name?: string;
  overriddencreatedon?: string;
  serviceid?: string;
  showresources?: boolean;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
