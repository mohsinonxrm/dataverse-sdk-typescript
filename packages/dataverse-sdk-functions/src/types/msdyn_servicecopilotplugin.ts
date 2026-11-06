/**
 * msdyn_servicecopilotplugin entity type
 */
export interface msdyn_servicecopilotplugin {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_aipluginid_value?: string;
  _msdyn_botcomponentid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_analyticsenabled?: boolean;
  msdyn_authmode?: number;
  msdyn_connectionidpendingpublish?: boolean;
  msdyn_customconnectorcontext?: string;
  msdyn_ispublishpending?: boolean;
  msdyn_lastbappluginsynctime?: string;
  msdyn_lastpublishsuccesson?: string;
  msdyn_name?: string;
  msdyn_needsrolecheck?: boolean;
  msdyn_parameterconfiguration?: string;
  msdyn_plugindescription?: string;
  msdyn_pluginname?: string;
  msdyn_plugintype?: number;
  msdyn_pluginuniquename?: string;
  msdyn_publishinitiatedon?: string;
  msdyn_servicecopilotpluginid?: string;
  msdyn_skipgptresponse?: boolean;
  msdyn_status?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
