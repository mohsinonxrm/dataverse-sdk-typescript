/**
 * msdyn_transformationjobtracker entity type
 */
export interface msdyn_transformationjobtracker {
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
  msdyn_apiname?: string;
  msdyn_jobname?: string;
  msdyn_jobstatus?: number;
  msdyn_message?: string;
  msdyn_name?: string;
  msdyn_relatedid?: string;
  msdyn_transformationjobtrackerid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
