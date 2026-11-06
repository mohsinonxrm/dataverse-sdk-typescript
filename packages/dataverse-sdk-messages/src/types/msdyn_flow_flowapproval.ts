/**
 * msdyn_flow_flowapproval entity type
 */
export interface msdyn_flow_flowapproval {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_flow_flowapproval_approval_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_flow_flowapproval_flowculture?: string;
  msdyn_flow_flowapproval_flowid?: string;
  msdyn_flow_flowapproval_flowname?: string;
  msdyn_flow_flowapproval_flownotificationuri?: string;
  msdyn_flow_flowapproval_flowrunsequenceid?: string;
  msdyn_flow_flowapproval_name?: string;
  msdyn_flow_flowapproval_sendflowemail?: boolean;
  msdyn_flow_flowapproval_sendflowpush?: boolean;
  msdyn_flow_flowapprovalid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
