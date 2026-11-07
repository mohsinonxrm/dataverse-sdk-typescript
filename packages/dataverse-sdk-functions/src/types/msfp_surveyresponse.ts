import type { activitypointer } from "./activitypointer.js";

/**
 * msfp_surveyresponse entity type
 */
export interface msfp_surveyresponse extends activitypointer {
  _msfp_parent_survey_response_new_value?: string;
  _msfp_parentsurveyresponse_value?: string;
  _msfp_surveyid_value?: string;
  _msfp_surveyinviteid_value?: string;
  importsequencenumber?: number;
  msfp_embedcontextparameters?: string;
  msfp_isquestionresponsegenerated?: boolean;
  msfp_isquestionresponsesgenerated?: boolean;
  msfp_language?: string;
  msfp_locale?: string;
  msfp_name?: string;
  msfp_npsscore?: number;
  msfp_otherproperties?: string;
  msfp_questionresponseslist?: string;
  msfp_respondent?: string;
  msfp_respondentemailaddress?: string;
  msfp_responsetype?: string;
  msfp_satisfactionmetriccalculated?: boolean;
  msfp_satisfactionmetricvalue?: string;
  msfp_sentiment?: number;
  msfp_sourceresponseidentifier?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_startdate?: string;
  msfp_submitdate?: string;
  msfp_surveyresponse?: string;
  msfp_surveyresponseurl?: string;
  overriddencreatedon?: string;
}
