/**
 * msdyn_flow_approvalresponse entity type
 */
export interface msdyn_flow_approvalresponse {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_flow_approvalresponse_approval_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_flow_approvalresponse_additionalfields?: string;
  msdyn_flow_approvalresponse_approvalstagekey?: string;
  msdyn_flow_approvalresponse_comments?: string;
  msdyn_flow_approvalresponse_name?: string;
  msdyn_flow_approvalresponse_response?: string;
  msdyn_flow_approvalresponse_stage?: number;
  msdyn_flow_approvalresponse_stepnumber?: number;
  msdyn_flow_approvalresponseid?: string;
  msdyn_flow_approvalresponseidx_approvalid?: string;
  msdyn_flow_approvalresponseidx_owninguserid?: string;
  msdyn_flow_approvalresponseidx_stage?: string;
  overriddencreatedon?: string;
  stagenumber?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
