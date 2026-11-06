/**
 * msfp_satisfactionmetric entity type
 */
export interface msfp_satisfactionmetric {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msfp_project_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msfp_description?: string;
  msfp_historicalcomputedvalue?: string;
  msfp_issystemkpi?: boolean;
  msfp_lastcomputedon?: string;
  msfp_lastcomputedvalue?: string;
  msfp_maximumvalue?: number;
  msfp_minimumvalue?: number;
  msfp_name?: string;
  msfp_questions?: string;
  msfp_satisfactionmetricid?: string;
  msfp_status?: number;
  msfp_threshold?: number;
  msfp_type?: string;
  msfp_versionnumber?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
