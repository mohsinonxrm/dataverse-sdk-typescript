/**
 * msdyn_intentharvesting_batchjobstatus entity type
 */
export interface msdyn_intentharvesting_batchjobstatus {
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
  msdyn_batchjob_package_id?: string;
  msdyn_insights?: string;
  msdyn_intentharvesting_batchjobstatusid?: string;
  msdyn_job_status_details?: string;
  msdyn_jobstatus?: number;
  msdyn_jobtype?: number;
  msdyn_last_successful_run?: string;
  msdyn_name?: string;
  msdyn_records_processed?: number;
  msdyn_run_frequency?: string;
  msdyn_runconfiguration?: string;
  msdyn_target_entity_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
