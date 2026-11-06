/**
 * msfp_emailtemplate entity type
 */
export interface msfp_emailtemplate {
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
  msfp_candelete?: boolean;
  msfp_canedit?: boolean;
  msfp_canrename?: boolean;
  msfp_emailtemplatebody?: string;
  msfp_emailtemplateid?: string;
  msfp_emailtemplatesubject?: string;
  msfp_language?: string;
  msfp_name?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_tags?: string;
  msfp_templatetype?: number;
  msfp_version?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
