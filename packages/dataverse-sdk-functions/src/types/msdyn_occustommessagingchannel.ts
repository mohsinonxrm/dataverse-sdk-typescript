/**
 * msdyn_occustommessagingchannel entity type
 */
export interface msdyn_occustommessagingchannel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managedidentityid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_commonchannelconfigid_value?: string;
  _msdyn_custombotchannelregistration_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_ocwidgetlanguage_value?: string;
  _msdyn_postconversationsurvey_value?: string;
  _msdyn_postconversationsurveyseparatebotsurvey_value?: string;
  _msdyn_translationproviderapikeyid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentdisplayname?: number;
  msdyn_appid?: string;
  msdyn_enablefileattachmentsforagents?: boolean;
  msdyn_enablefileattachmentsforcustomers?: boolean;
  msdyn_enablerealtimelanguagetranslation?: boolean;
  msdyn_enabletranslationproviderfields?: boolean;
  msdyn_name?: string;
  msdyn_occustomchannelid?: number;
  msdyn_occustommessagingchannelid?: string;
  msdyn_postconversationsurveybotsurvey?: boolean;
  msdyn_postconversationsurveybotsurveymessagetext?: string;
  msdyn_postconversationsurveybotsurveymode?: number;
  msdyn_postconversationsurveyenable?: boolean;
  msdyn_postconversationsurveymessagetext?: string;
  msdyn_postconversationsurveymode?: number;
  msdyn_tenantid?: string;
  msdyn_translationprovider?: number;
  msdyn_translationprovidertype?: number;
  msdyn_webhookurl?: string;
  msdyn_webresourceurl?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
