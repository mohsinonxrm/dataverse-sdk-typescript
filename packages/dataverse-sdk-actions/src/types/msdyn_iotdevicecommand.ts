/**
 * msdyn_iotdevicecommand entity type
 */
export interface msdyn_iotdevicecommand {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_command_value?: string;
  _msdyn_customerasset_value?: string;
  _msdyn_device_value?: string;
  _msdyn_parentalert_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_commandstatus?: number;
  msdyn_commandstatusreason?: string;
  msdyn_deviceid?: string;
  msdyn_iotdevicecommandid?: string;
  msdyn_message?: string;
  msdyn_name?: string;
  msdyn_sendtoallconnecteddevices?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
