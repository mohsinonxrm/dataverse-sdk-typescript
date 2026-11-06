import type { activitypointer } from "./activitypointer.js";

/**
 * msfp_surveyinvite entity type
 */
export interface msfp_surveyinvite extends activitypointer {
  msfp_inviteupdateddate?: string;
  msfp_channel?: number;
  msfp_invitebouncedetails?: string;
  msfp_inviteemailaddress?: string;
  msfp_customervoicesurveyinvite?: string;
  importsequencenumber?: number;
  msfp_invitestatus?: number;
  msfp_respondent?: string;
  msfp_subject?: string;
  msfp_invitefailurereason?: number;
  _msfp_surveyid_value?: string;
  _msfp_unsubscribedrecipientsurveyinviteid_value?: string;
  msfp_fromemailaddress?: string;
  msfp_contextparameters?: string;
  msfp_invitestatusreason?: string;
  msfp_isincentiveenabled?: boolean;
  msfp_sourcesurveyidentifier?: string;
  msfp_surveyinvitationurl?: string;
  msfp_invitebouncecategory?: number;
  overriddencreatedon?: string;
  msfp_emailmessage?: string;
  msfp_invitesentdate?: string;
  msfp_longurl?: string;
  msfp_otherproperties?: string;
}
