/**
 * msfp_project entity type
 */
export interface msfp_project {
  msfp_templateid?: string;
  msfp_projectid?: string;
  msfp_permanentid?: string;
  versionnumber?: number;
  msfp_dataclassification?: string;
  msfp_templateversion?: string;
  msfp_description?: string;
  _owninguser_value?: string;
  utcconversiontimezonecode?: number;
  modifiedon?: string;
  msfp_customerinsightsconfiguration?: string;
  _owningbusinessunit_value?: string;
  createdon?: string;
  overriddencreatedon?: string;
  msfp_environmentregion?: string;
  _createdonbehalfby_value?: string;
  _owningteam_value?: string;
  _modifiedby_value?: string;
  importsequencenumber?: number;
  _createdby_value?: string;
  msfp_status?: number;
  timezoneruleversionnumber?: number;
  _ownerid_value?: string;
  msfp_isgroupdeleted?: boolean;
  statecode?: number;
  msfp_name?: string;
  statuscode?: number;
  msfp_isgroupproject?: boolean;
  msfp_environmentid?: string;
  msfp_issharedproject?: boolean;
  _modifiedonbehalfby_value?: string;
}
