/**
 * msdyn_flow_approvalrequest entity type
 */
export interface msdyn_flow_approvalrequest {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_flow_approvalrequest_approval_value?: string;
  _msdyn_flow_approvalrequest_reassignedfrom_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_flow_approvalrequest_allowreassignment?: boolean;
  msdyn_flow_approvalrequest_approvalstagekey?: string;
  msdyn_flow_approvalrequest_dueon?: string;
  msdyn_flow_approvalrequest_expireson?: string;
  msdyn_flow_approvalrequest_lastnotifiedon?: string;
  msdyn_flow_approvalrequest_name?: string;
  msdyn_flow_approvalrequest_notificationfrequency?: number;
  msdyn_flow_approvalrequest_options?: string;
  msdyn_flow_approvalrequest_partnermetadata?: string;
  msdyn_flow_approvalrequest_responseoptions?: string;
  msdyn_flow_approvalrequest_responseoptionstype?: number;
  msdyn_flow_approvalrequest_stage?: number;
  msdyn_flow_approvalrequest_stepnumber?: number;
  msdyn_flow_approvalrequestid?: string;
  msdyn_flow_approvalrequestidx_approvalid?: string;
  msdyn_flow_approvalrequestidx_owninguserid?: string;
  msdyn_flow_approvalrequestidx_reassignedfromid?: string;
  msdyn_flow_approvalrequestidx_stage?: string;
  overriddencreatedon?: string;
  stagenumber?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
