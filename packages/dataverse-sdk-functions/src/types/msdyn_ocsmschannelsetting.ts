import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_ocsmschannelsetting entity type
 */
export interface msdyn_ocsmschannelsetting {
  _msdyn_postconversationsurveyseparatebotsurvey_value?: string;
  msdyn_ocsmschannelsettingid?: string;
  msdyn_postconversationsurveyenable?: boolean;
  msdyn_postconversationsurveymessagetext?: string;
  msdyn_inboundurl?: string;
  _msdyn_language_value?: string;
  ismanaged?: boolean;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  componentstate?: number;
  msdyn_enablefileattachmentforagents?: boolean;
  _msdyn_postconversationsurvey_value?: string;
  iscustomizable?: BooleanManagedProperty;
  msdyn_postconversationsurveybotsurveymode?: number;
  statuscode?: number;
  _msdyn_phonenumberid_value?: string;
  importsequencenumber?: number;
  _msdyn_operatinghourid_value?: string;
  msdyn_postconversationsurveybotsurvey?: boolean;
  _organizationid_value?: string;
  modifiedon?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  createdon?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  componentidunique?: string;
  msdyn_postconversationsurveymode?: number;
  statecode?: number;
  _createdonbehalfby_value?: string;
  msdyn_enablefileattachmentforcustomers?: boolean;
  msdyn_name?: string;
  _msdyn_liveworkstreamid_value?: string;
  msdyn_postconversationsurveybotsurveymessagetext?: string;
  _createdby_value?: string;
  solutionid?: string;
  overwritetime?: string;
}
