/**
 * msdyn_evaluationplanbatch entity type
 */
export interface msdyn_evaluationplanbatch {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_assignedto_value?: string;
  _msdyn_evaluationplanrun_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionalcontext?: string;
  msdyn_batchevaluationjobid?: string;
  msdyn_batchprocessingcompletedon?: string;
  msdyn_batchprocessingstartedon?: string;
  msdyn_batchsize?: number;
  msdyn_criteriajson?: string;
  msdyn_errordetails?: string;
  msdyn_evaluationmethod?: number;
  msdyn_evaluationplanbatchid?: string;
  msdyn_evaluationplanbatchids?: string;
  msdyn_evaluationscreated?: number;
  msdyn_evaluationsfailed?: number;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
