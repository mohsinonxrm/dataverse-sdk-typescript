/**
 * approvalstageapproval entity type
 */
export interface approvalstageapproval {
  _approval_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  allowcancel?: boolean;
  allowreassign?: boolean;
  approvalstageapprovalid?: string;
  createdon?: string;
  customfields?: string;
  details?: string;
  importsequencenumber?: number;
  itemlink?: string;
  itemlinkdescription?: string;
  modelid?: string;
  modeltype?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  result?: string;
  sendemailnotification?: boolean;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
