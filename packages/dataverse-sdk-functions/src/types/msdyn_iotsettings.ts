/**
 * msdyn_iotsettings entity type
 */
export interface msdyn_iotsettings {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_defaultiotproviderinstance_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_commandnameproperty?: string;
  msdyn_commandparametersproperty?: string;
  msdyn_defaultiotsource?: number;
  msdyn_deploymentappurl?: string;
  msdyn_devicedatapullfrequency?: number;
  msdyn_enableiotsuggestions?: boolean;
  msdyn_enhancedbackgroundprocessing?: boolean;
  msdyn_iotalertaggregationrule?: string;
  msdyn_iotsettingsid?: string;
  msdyn_name?: string;
  msdyn_nextdevicedatapulltime?: string;
  msdyn_scheduleddevicedatapull?: boolean;
  msdyn_showwelcome?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
