/**
 * approvalstageorder entity type
 */
export interface approvalstageorder {
  _approval_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _stageapproval_value?: string;
  _stagecondition_value?: string;
  _stageintelligent_value?: string;
  approvalstageorderid?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  ordernumber?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  type?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
