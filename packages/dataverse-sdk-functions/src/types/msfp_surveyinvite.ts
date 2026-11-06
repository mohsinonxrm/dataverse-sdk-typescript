import type { activitypointer } from './activitypointer.js';

/**
 * msfp_surveyinvite entity type
 */
export interface msfp_surveyinvite extends activitypointer {
  _msfp_surveyid_value?: string;
  _msfp_unsubscribedrecipientsurveyinviteid_value?: string;
  importsequencenumber?: number;
  msfp_channel?: number;
  msfp_contextparameters?: string;
  msfp_customervoicesurveyinvite?: string;
  msfp_emailmessage?: string;
  msfp_fromemailaddress?: string;
  msfp_invitebouncecategory?: number;
  msfp_invitebouncedetails?: string;
  msfp_inviteemailaddress?: string;
  msfp_invitefailurereason?: number;
  msfp_invitesentdate?: string;
  msfp_invitestatus?: number;
  msfp_invitestatusreason?: string;
  msfp_inviteupdateddate?: string;
  msfp_isincentiveenabled?: boolean;
  msfp_longurl?: string;
  msfp_otherproperties?: string;
  msfp_respondent?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_subject?: string;
  msfp_surveyinvitationurl?: string;
  overriddencreatedon?: string;
}
