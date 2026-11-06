/**
 * msdyn_iotdevicedatahistory entity type
 */
export interface msdyn_iotdevicedatahistory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_device_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_connectionstate?: boolean;
  msdyn_connectionstateupdatedtime?: string;
  msdyn_devicereportedproperties?: string;
  msdyn_iotdevicedatahistoryid?: string;
  msdyn_iothubdeviceid?: string;
  msdyn_lastactivitytime?: string;
  msdyn_name?: string;
  msdyn_status?: number;
  msdyn_statusreason?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
