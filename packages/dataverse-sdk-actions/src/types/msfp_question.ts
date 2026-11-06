/**
 * msfp_question entity type
 */
export interface msfp_question {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_survey_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_choicetype?: number;
  msfp_correctanswer?: string;
  msfp_imageproperties?: string;
  msfp_maximumrating?: number;
  msfp_multiline?: boolean;
  msfp_name?: string;
  msfp_order?: number;
  msfp_otherproperties?: string;
  msfp_permanentid?: string;
  msfp_questionchoices?: string;
  msfp_questionid?: string;
  msfp_questiontext?: string;
  msfp_questiontype?: number;
  msfp_responserequired?: boolean;
  msfp_sequence?: number;
  msfp_sourceparentquestionidentifier?: string;
  msfp_sourcequestionidentifier?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_subtitle?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
