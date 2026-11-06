/**
 * msfp_questionresponse entity type
 */
export interface msfp_questionresponse {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_questionid_value?: string;
  _msfp_surveyresponseid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_keyphrases?: string;
  msfp_name?: string;
  msfp_otherproperties?: string;
  msfp_questionresponseid?: string;
  msfp_response?: string;
  msfp_sentimentvalue?: number;
  msfp_sourcequestionidentifier?: string;
  msfp_sourceresponseidentifier?: string;
  msfp_sourcesurveyidentifier?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
