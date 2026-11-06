/**
 * msdyn_sessionevent entity type
 */
export interface msdyn_sessionevent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_omnichannelsession_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_eventinfo?: number;
  msdyn_eventreason?: number;
  msdyn_eventtime?: string;
  msdyn_eventtype?: number;
  msdyn_name?: string;
  msdyn_sessioneventid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
