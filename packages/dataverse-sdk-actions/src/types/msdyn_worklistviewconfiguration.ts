/**
 * msdyn_worklistviewconfiguration entity type
 */
export interface msdyn_worklistviewconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_salesaccelerationsettingsid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_adminsortconfiguration?: string;
  msdyn_autorefreshenable?: number;
  msdyn_autorefreshinterval?: number;
  msdyn_cardlayout?: string;
  msdyn_defaultsortconfiguration?: string;
  msdyn_entityconfiguration?: string;
  msdyn_filterconfiguration?: string;
  msdyn_inheritrolesfromparentsettings?: boolean;
  msdyn_name?: string;
  msdyn_securityrolelist?: string;
  msdyn_tagsconfiguration?: string;
  msdyn_viewtype?: number;
  msdyn_worklistviewconfigurationid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
