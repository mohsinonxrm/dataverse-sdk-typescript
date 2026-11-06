import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocwhatsappchannelnumber entity type
 */
export interface msdyn_ocwhatsappchannelnumber {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_ocwhatsappaccountid_value?: string;
  _msdyn_ocwidgetlanguage_value?: string;
  _msdyn_postconversationsurvey_value?: string;
  _msdyn_postconversationsurveyseparatebotsurvey_value?: string;
  _msdyn_translationproviderapikeyid_value?: string;
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
  msdyn_enablefileattachmentsforagents?: boolean;
  msdyn_enablefileattachmentsforcustomers?: boolean;
  msdyn_enablerealtimelanguagetranslation?: boolean;
  msdyn_enabletranslationproviderfields?: boolean;
  msdyn_name?: string;
  msdyn_ocwhatsappchannelnumberid?: string;
  msdyn_organizationphonenumber?: string;
  msdyn_postconversationsurveybotsurvey?: boolean;
  msdyn_postconversationsurveybotsurveymessagetext?: string;
  msdyn_postconversationsurveybotsurveymode?: number;
  msdyn_postconversationsurveyenable?: boolean;
  msdyn_postconversationsurveymessagetext?: string;
  msdyn_postconversationsurveymode?: number;
  msdyn_providerchannelid?: string;
  msdyn_translationprovider?: number;
  msdyn_translationprovidertype?: number;
  msdyn_webresourceurl?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
