/**
 * msdyn_iotdevicevisualizationconfiguration entity type
 */
export interface msdyn_iotdevicevisualizationconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_iotdevice_value?: string;
  _msdyn_iotdevicecategory_value?: string;
  _msdyn_measurement_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actionname?: string;
  msdyn_aggregation?: number;
  msdyn_deviceevent?: number;
  msdyn_iotdevicevisualizationconfigurationid?: string;
  msdyn_name?: string;
  msdyn_position?: number;
  msdyn_timerangetype?: number;
  msdyn_timerangevalue?: number;
  msdyn_visualizationconfigurationtype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
