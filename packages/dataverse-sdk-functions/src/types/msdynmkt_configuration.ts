/**
 * msdynmkt_configuration entity type
 */
export interface msdynmkt_configuration {
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
  msdynmkt_ciconnectedon?: string;
  msdynmkt_ciprovisionjobid?: string;
  msdynmkt_cistatus?: number;
  msdynmkt_configcacheexpirationdate?: string;
  msdynmkt_configcacheexpirationperiodinms?: number;
  msdynmkt_configurationid?: string;
  msdynmkt_default?: boolean;
  msdynmkt_discoveryendpointurl?: string;
  msdynmkt_httptimeout?: number;
  msdynmkt_maxretryattempts?: number;
  msdynmkt_name?: string;
  msdynmkt_organization_config?: string;
  msdynmkt_tokenauthenticationresource?: string;
  msdynmkt_usebasicauth?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
