/**
 * msfp_log entity type
 */
export interface msfp_log {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_details?: string;
  msfp_logid?: string;
  msfp_name?: string;
  msfp_operation?: string;
  msfp_recordid?: string;
  msfp_recordtype?: string;
  msfp_sourcesurveyidentifier?: string;
  msfp_surveytableid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
