import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_authenticationsettings entity type
 */
export interface msdyn_authenticationsettings {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_accesstokenurl?: string;
  msdyn_actionname?: string;
  msdyn_additionalparams?: string;
  msdyn_audience?: string;
  msdyn_authenticationchanneltype?: number;
  msdyn_authenticationclientid?: string;
  msdyn_authenticationclientsecret?: string;
  msdyn_authenticationfactors?: string;
  msdyn_authenticationscopes?: string;
  msdyn_authenticationsettingsid?: string;
  msdyn_authenticationtype?: number;
  msdyn_authorityurl?: string;
  msdyn_authserviceconfigsetid?: string;
  msdyn_authservicescopeid?: string;
  msdyn_clientid?: string;
  msdyn_decryptedtokenurl?: string;
  msdyn_endpointregion?: number;
  msdyn_enrollmentfactors?: string;
  msdyn_javascriptclientfunction?: string;
  msdyn_mappedaccountidfield?: string;
  msdyn_mappedcontactidfield?: string;
  msdyn_maxauthenticationattempts?: number;
  msdyn_name?: string;
  msdyn_ocauthchanneltype?: number;
  msdyn_onetimepasswordauthenticationenabled?: boolean;
  msdyn_onetimepasswordverificationsettings?: string;
  msdyn_publickeyurl?: string;
  msdyn_publickeyurlenvvar?: string;
  msdyn_redirecturi?: string;
  msdyn_supportedscopes?: string;
  msdyn_useauthcodeflow?: boolean;
  msdyn_voicebiometricsenabled?: boolean;
  msdyn_voicebiometricsenrollmentsettings?: string;
  msdyn_voicebiometricsexternalservicesettings?: string;
  msdyn_voicebiometricsfrauddetectionsettings?: string;
  msdyn_voicebiometricsmaxaudioduration?: number;
  msdyn_voicebiometricsprovider?: number;
  msdyn_voicebiometricsverificationsettings?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
