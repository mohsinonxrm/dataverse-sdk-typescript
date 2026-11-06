/**
 * msfp_survey entity type
 */
export interface msfp_survey {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_project_value?: string;
  _msfp_publishedby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_acceptanonymousresponses?: boolean;
  msfp_anonymousurl?: string;
  msfp_description?: string;
  msfp_embedcode?: string;
  msfp_enddate?: string;
  msfp_friendlyname?: string;
  msfp_latestsurveyidentifier?: string;
  msfp_name?: string;
  msfp_otherproperties?: string;
  msfp_permanentid?: string;
  msfp_publishedon?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_sourcesurveymodifieddate?: string;
  msfp_sourcesurveyversion?: string;
  msfp_startdate?: string;
  msfp_surveyid?: string;
  msfp_surveysource?: string;
  msfp_surveytableid?: string;
  msfp_surveyurl?: string;
  msfp_variables?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
