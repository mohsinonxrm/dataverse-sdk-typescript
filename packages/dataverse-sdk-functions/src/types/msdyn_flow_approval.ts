/**
 * msdyn_flow_approval entity type
 */
export interface msdyn_flow_approval {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _currentstage_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_flow_approval_basicapprovalmodel_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_flow_approval_additionalfields?: string;
  msdyn_flow_approval_allowcancel?: boolean;
  msdyn_flow_approval_allowreassign?: boolean;
  msdyn_flow_approval_approvalstagekey?: string;
  msdyn_flow_approval_category?: string;
  msdyn_flow_approval_completedon?: string;
  msdyn_flow_approval_currentstepnumber?: number;
  msdyn_flow_approval_details?: string;
  msdyn_flow_approval_dueon?: string;
  msdyn_flow_approval_expireson?: string;
  msdyn_flow_approval_itemlink?: string;
  msdyn_flow_approval_itemlinkdescription?: string;
  msdyn_flow_approval_itemlinkhash?: string;
  msdyn_flow_approval_modelid?: string;
  msdyn_flow_approval_modeltype?: string;
  msdyn_flow_approval_name?: string;
  msdyn_flow_approval_partneridhash?: string;
  msdyn_flow_approval_partnermetadata?: string;
  msdyn_flow_approval_priority?: number;
  msdyn_flow_approval_requesttype?: number;
  msdyn_flow_approval_result?: string;
  msdyn_flow_approval_sendemail?: boolean;
  msdyn_flow_approval_source?: string;
  msdyn_flow_approval_stage?: number;
  msdyn_flow_approval_tags?: string;
  msdyn_flow_approval_templateformid?: string;
  msdyn_flow_approval_templateid?: string;
  msdyn_flow_approval_templateresponseid?: string;
  msdyn_flow_approval_title?: string;
  msdyn_flow_approvalid?: string;
  overriddencreatedon?: string;
  processid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
