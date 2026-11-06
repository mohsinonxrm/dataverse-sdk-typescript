/**
 * msdyn_flow_approvalstep entity type
 */
export interface msdyn_flow_approvalstep {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_flow_approvalstep_approval_value?: string;
  _msdyn_flow_approvalstep_model_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_flow_approvalstep_approvalid?: string;
  msdyn_flow_approvalstep_modeltype?: string;
  msdyn_flow_approvalstep_number?: number;
  msdyn_flow_approvalstep_result?: string;
  msdyn_flow_approvalstep_stage?: number;
  msdyn_flow_approvalstepid?: string;
  msdyn_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
