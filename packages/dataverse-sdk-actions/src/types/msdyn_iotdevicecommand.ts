/**
 * msdyn_iotdevicecommand entity type
 */
export interface msdyn_iotdevicecommand {
  statuscode: number;
  utcconversiontimezonecode: number;
  msdyn_commandstatusreason: string;
  statecode: number;
  msdyn_iotdevicecommandid: string;
  timezoneruleversionnumber: number;
  _msdyn_device_value: string;
  _modifiedby_value: string;
  msdyn_message: string;
  _owningteam_value: string;
  _ownerid_value: string;
  _msdyn_parentalert_value: string;
  _msdyn_command_value: string;
  _createdonbehalfby_value: string;
  msdyn_name: string;
  _createdby_value: string;
  _msdyn_customerasset_value: string;
  _owninguser_value: string;
  _owningbusinessunit_value: string;
  importsequencenumber: number;
  msdyn_deviceid: string;
  createdon: string;
  versionnumber: number;
  modifiedon: string;
  _modifiedonbehalfby_value: string;
  overriddencreatedon: string;
  msdyn_commandstatus: number;
  msdyn_sendtoallconnecteddevices: boolean;
}
