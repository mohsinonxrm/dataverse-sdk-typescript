/**
 * msdyn_octeamschannelconfig entity type
 */
export interface msdyn_octeamschannelconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
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
  msdyn_botid?: string;
  msdyn_callingoptions?: number;
  msdyn_enablefileattachmentsforagents?: boolean;
  msdyn_enablefileattachmentsforcustomers?: boolean;
  msdyn_enablerealtimelanguagetranslation?: boolean;
  msdyn_enabletranslationproviderfields?: boolean;
  msdyn_name?: string;
  msdyn_octeamschannelconfigid?: string;
  msdyn_postconversationsurveybotsurvey?: boolean;
  msdyn_postconversationsurveybotsurveymessagetext?: string;
  msdyn_postconversationsurveybotsurveymode?: number;
  msdyn_postconversationsurveyenable?: boolean;
  msdyn_postconversationsurveymessagetext?: string;
  msdyn_postconversationsurveymode?: number;
  msdyn_teamsappname?: string;
  msdyn_translationprovider?: number;
  msdyn_translationprovidertype?: number;
  msdyn_webresourceurl?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
