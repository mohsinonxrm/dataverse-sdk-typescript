/**
 * msfp_surveyreminder entity type
 */
export interface msfp_surveyreminder {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_emailtemplate_value?: string;
  _msfp_survey_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_description?: string;
  msfp_name?: string;
  msfp_properties?: string;
  msfp_scheduleddate?: string;
  msfp_status?: number;
  msfp_surveyreminderid?: string;
  msfp_type?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
