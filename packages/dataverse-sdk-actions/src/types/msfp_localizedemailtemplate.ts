/**
 * msfp_localizedemailtemplate entity type
 */
export interface msfp_localizedemailtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_emailtemplateid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_emailtemplatebody?: string;
  msfp_emailtemplatesubject?: string;
  msfp_language?: string;
  msfp_localizedemailtemplateid?: string;
  msfp_name?: string;
  msfp_version?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
