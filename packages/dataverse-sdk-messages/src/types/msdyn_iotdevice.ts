/**
 * msdyn_iotdevice entity type
 */
export interface msdyn_iotdevice {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_account_value?: string;
  _msdyn_category_value?: string;
  _msdyn_iotproviderinstance_value?: string;
  _msdyn_lastcommandsent_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_connectionstate?: boolean;
  msdyn_deviceid?: string;
  msdyn_devicereportedproperties?: string;
  msdyn_devicesettings?: string;
  msdyn_iotdeviceid?: string;
  msdyn_issimulated?: number;
  msdyn_lastactivitytime?: string;
  msdyn_lastcommandsenttime?: string;
  msdyn_name?: string;
  msdyn_registrationmessage?: string;
  msdyn_registrationstatus?: number;
  msdyn_tags?: string;
  msdyn_timezone?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
