/**
 * msdyn_ocbotchannelregistration entity type
 */
export interface msdyn_ocbotchannelregistration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_communicationprovidersettingid_value?: string;
  _msdyn_ocfbapplicationid_value?: string;
  _msdyn_ocgbmagentaccount_value?: string;
  _msdyn_ocgbmpartneraccount_value?: string;
  _msdyn_oclinechannelconfigid_value?: string;
  _msdyn_ocm365copilotchannelconfigid_value?: string;
  _msdyn_octeamschannelconfigid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_bottype?: number;
  msdyn_iscustommessagingbcr?: boolean;
  msdyn_iscustommessagingcreated?: boolean;
  msdyn_lastvalidateddate?: string;
  msdyn_messagingendpoint?: string;
  msdyn_msappid?: string;
  msdyn_msappsecret?: string;
  msdyn_name?: string;
  msdyn_ocbotchannelregistrationid?: string;
  msdyn_securemsappsecret?: string;
  msdyn_tenantid?: string;
  msdyn_validationstatus?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
