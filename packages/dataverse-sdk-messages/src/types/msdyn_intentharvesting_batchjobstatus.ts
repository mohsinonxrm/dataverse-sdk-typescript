/**
 * msdyn_intentharvesting_batchjobstatus entity type
 */
export interface msdyn_intentharvesting_batchjobstatus {
  msdyn_jobstatus?: number;
  msdyn_jobtype?: number;
  timezoneruleversionnumber?: number;
  msdyn_last_successful_run?: string;
  modifiedon?: string;
  createdon?: string;
  _createdby_value?: string;
  versionnumber?: number;
  msdyn_batchjob_package_id?: string;
  msdyn_job_status_details?: string;
  _createdonbehalfby_value?: string;
  _owninguser_value?: string;
  overriddencreatedon?: string;
  statecode?: number;
  msdyn_intentharvesting_batchjobstatusid?: string;
  statuscode?: number;
  msdyn_records_processed?: number;
  _owningteam_value?: string;
  utcconversiontimezonecode?: number;
  _modifiedonbehalfby_value?: string;
  msdyn_runconfiguration?: string;
  _ownerid_value?: string;
  msdyn_run_frequency?: string;
  importsequencenumber?: number;
  _modifiedby_value?: string;
  _owningbusinessunit_value?: string;
  msdyn_target_entity_name?: string;
  msdyn_name?: string;
}
