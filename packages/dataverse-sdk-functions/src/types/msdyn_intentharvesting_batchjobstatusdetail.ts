/**
 * msdyn_intentharvesting_batchjobstatusdetail entity type
 */
export interface msdyn_intentharvesting_batchjobstatusdetail {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_intentfamilyid_value?: string;
  _msdyn_intentharvesting_batchjobstatusid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_intentharvesting_batchjobstatusdetailid?: string;
  msdyn_job_status_details?: string;
  msdyn_jobreviewstate?: number;
  msdyn_name?: string;
  msdyn_runconfiguration?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
