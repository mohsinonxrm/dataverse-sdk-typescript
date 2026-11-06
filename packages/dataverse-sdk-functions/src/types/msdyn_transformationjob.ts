/**
 * msdyn_transformationjob entity type
 */
export interface msdyn_transformationjob {
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
  msdyn_additionaldetails?: string;
  msdyn_completedon?: string;
  msdyn_name?: string;
  msdyn_operation?: number;
  msdyn_retrydetails?: string;
  msdyn_sourceworkstreamid?: string;
  msdyn_stage?: number;
  msdyn_stagestatus?: number;
  msdyn_startedon?: string;
  msdyn_targetworkstreamid?: string;
  msdyn_telephonenumber?: string;
  msdyn_transformationjobid?: string;
  msdyn_transformationtype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
