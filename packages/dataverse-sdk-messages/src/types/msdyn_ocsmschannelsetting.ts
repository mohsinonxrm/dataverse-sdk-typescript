import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocsmschannelsetting entity type
 */
export interface msdyn_ocsmschannelsetting {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_language_value?: string;
  _msdyn_liveworkstreamid_value?: string;
  _msdyn_operatinghourid_value?: string;
  _msdyn_phonenumberid_value?: string;
  _msdyn_postconversationsurvey_value?: string;
  _msdyn_postconversationsurveyseparatebotsurvey_value?: string;
  _msdyn_translationproviderapikeyid_value?: string;
  _organizationid_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_enablefileattachmentforagents?: boolean;
  msdyn_enablefileattachmentforcustomers?: boolean;
  msdyn_enablerealtimelanguagetranslation?: boolean;
  msdyn_enabletranslationproviderfields?: boolean;
  msdyn_inboundurl?: string;
  msdyn_name?: string;
  msdyn_ocsmschannelsettingid?: string;
  msdyn_postconversationsurveybotsurvey?: boolean;
  msdyn_postconversationsurveybotsurveymessagetext?: string;
  msdyn_postconversationsurveybotsurveymode?: number;
  msdyn_postconversationsurveyenable?: boolean;
  msdyn_postconversationsurveymessagetext?: string;
  msdyn_postconversationsurveymode?: number;
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
