/**
 * msfp_project entity type
 */
export interface msfp_project {
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
  msfp_customerinsightsconfiguration?: string;
  msfp_dataclassification?: string;
  msfp_description?: string;
  msfp_environmentid?: string;
  msfp_environmentregion?: string;
  msfp_isgroupdeleted?: boolean;
  msfp_isgroupproject?: boolean;
  msfp_issharedproject?: boolean;
  msfp_name?: string;
  msfp_permanentid?: string;
  msfp_projectid?: string;
  msfp_status?: number;
  msfp_templateid?: string;
  msfp_templateversion?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
