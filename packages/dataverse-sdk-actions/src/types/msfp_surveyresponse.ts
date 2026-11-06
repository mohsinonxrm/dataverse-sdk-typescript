import type { activitypointer } from "./activitypointer.js";

/**
 * msfp_surveyresponse entity type
 */
export interface msfp_surveyresponse extends activitypointer {
  msfp_responsetype?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_isquestionresponsesgenerated?: boolean;
  msfp_isquestionresponsegenerated?: boolean;
  msfp_satisfactionmetriccalculated?: boolean;
  msfp_submitdate?: string;
  msfp_otherproperties?: string;
  msfp_respondentemailaddress?: string;
  _msfp_surveyinviteid_value?: string;
  msfp_sentiment?: number;
  _msfp_surveyid_value?: string;
  msfp_npsscore?: number;
  _msfp_parentsurveyresponse_value?: string;
  msfp_language?: string;
  msfp_startdate?: string;
  msfp_surveyresponse?: string;
  msfp_embedcontextparameters?: string;
  msfp_satisfactionmetricvalue?: string;
  importsequencenumber?: number;
  msfp_locale?: string;
  _msfp_parent_survey_response_new_value?: string;
  msfp_respondent?: string;
  msfp_sourceresponseidentifier?: string;
  overriddencreatedon?: string;
  msfp_name?: string;
  msfp_surveyresponseurl?: string;
  msfp_questionresponseslist?: string;
}
