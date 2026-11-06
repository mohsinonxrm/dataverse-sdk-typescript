import type { activitypointer } from './activitypointer.js';

/**
 * msfp_alert entity type
 */
export interface msfp_alert extends activitypointer {
  _msfp_alertrule_value?: string;
  _msfp_project_value?: string;
  _msfp_satisfactionmetric_value?: string;
  _msfp_survey_value?: string;
  _msfp_surveyresponse_value?: string;
  importsequencenumber?: number;
  msfp_assigneeemail?: string;
  msfp_assigneename?: string;
  msfp_customeremail?: string;
  msfp_customername?: string;
  msfp_notes?: string;
  msfp_questions?: string;
  msfp_reason?: string;
  msfp_resolutiondetail?: string;
  msfp_resolutionsentiment?: number;
  msfp_resolveremail?: string;
  msfp_resolvername?: string;
  overriddencreatedon?: string;
}
