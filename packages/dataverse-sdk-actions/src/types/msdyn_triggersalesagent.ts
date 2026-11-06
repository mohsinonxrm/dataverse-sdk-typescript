/**
 * msdyn_triggersalesagent entity type
 */
export interface msdyn_triggersalesagent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regardingid_value?: string;
  _msdyn_salesagentprofile_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_macroagentorchestrationid?: string;
  msdyn_name?: string;
  msdyn_skiphandovercompletionvalidation?: boolean;
  msdyn_triggerpayload?: string;
  msdyn_triggersalesagentid?: string;
  msdyn_triggertype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
