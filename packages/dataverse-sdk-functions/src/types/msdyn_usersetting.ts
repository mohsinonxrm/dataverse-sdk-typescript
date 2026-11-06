/**
 * msdyn_usersetting entity type
 */
export interface msdyn_usersetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_callconnectedpingpreference?: boolean;
  msdyn_compactmodeenabled?: boolean;
  msdyn_defaultcountrycode?: string;
  msdyn_extendtoastdisplaytime?: boolean;
  msdyn_hidetranscript?: boolean;
  msdyn_highcontrastenabled?: boolean;
  msdyn_name?: string;
  msdyn_noisesuppressionpreference?: boolean;
  msdyn_personalsoundenabled?: boolean;
  msdyn_preferredtimezone?: string;
  msdyn_soundformcontrol?: string;
  msdyn_soundpreferenceset?: boolean;
  msdyn_thememode?: number;
  msdyn_uilanguagelcid?: number;
  msdyn_usersettingid?: string;
  msdyn_voicesettings?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
