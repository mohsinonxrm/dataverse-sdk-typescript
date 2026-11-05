import type { activitypointer } from "./activitypointer.js";

/**
 * msfp_alert entity type
 */
export interface msfp_alert extends activitypointer {
  msfp_resolveremail?: string;
  _msfp_project_value?: string;
  msfp_resolvername?: string;
  _msfp_surveyresponse_value?: string;
  _msfp_survey_value?: string;
  _msfp_alertrule_value?: string;
  msfp_notes?: string;
  msfp_questions?: string;
  msfp_assigneename?: string;
  msfp_reason?: string;
  importsequencenumber?: number;
  _msfp_satisfactionmetric_value?: string;
  msfp_assigneeemail?: string;
  msfp_resolutionsentiment?: number;
  msfp_resolutiondetail?: string;
  msfp_customername?: string;
  overriddencreatedon?: string;
  msfp_customeremail?: string;
}
