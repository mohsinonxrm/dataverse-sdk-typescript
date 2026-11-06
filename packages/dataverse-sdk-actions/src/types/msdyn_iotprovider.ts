/**
 * msdyn_iotprovider entity type
 */
export interface msdyn_iotprovider {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_getaggregateddevicereadingsaction?: string;
  msdyn_iotproviderid?: string;
  msdyn_iotsource?: number;
  msdyn_name?: string;
  msdyn_pulldevicedataaction?: string;
  msdyn_querydevicereadingsaction?: string;
  msdyn_registeraction?: string;
  msdyn_sendcommandaction?: string;
  msdyn_updatedevicedataaction?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
