/**
 * msdyn_scenario entity type
 */
export interface msdyn_scenario {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_channelid_value?: string;
  _msdyn_notificationtemplate_value?: string;
  _msdyn_parentscenarioid_value?: string;
  _msdyn_sessiontemplate_value?: string;
  _msdyn_workstreamid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_displayname?: string;
  msdyn_name?: string;
  msdyn_scenarioid?: string;
  msdyn_type?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
