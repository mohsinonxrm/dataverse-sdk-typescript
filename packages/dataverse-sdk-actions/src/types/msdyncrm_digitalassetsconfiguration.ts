/**
 * msdyncrm_digitalassetsconfiguration entity type
 */
export interface msdyncrm_digitalassetsconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyncrm_configcacheexpirationdate?: string;
  msdyncrm_configcacheexpirationperiodinms?: number;
  msdyncrm_default?: boolean;
  msdyncrm_digitalassetsconfigurationid?: string;
  msdyncrm_discoveryendpointurl?: string;
  msdyncrm_httptimeout?: number;
  msdyncrm_iscxpflowenabled?: boolean;
  msdyncrm_isinstallcomplete?: boolean;
  msdyncrm_librarystatus?: number;
  msdyncrm_maxretryattempts?: number;
  msdyncrm_migrationstatus?: number;
  msdyncrm_name?: string;
  msdyncrm_organization_config?: string;
  msdyncrm_tokenauthenticationresource?: string;
  msdyncrm_usebasicauth?: boolean;
  msdyncrm_usedlibrary?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
