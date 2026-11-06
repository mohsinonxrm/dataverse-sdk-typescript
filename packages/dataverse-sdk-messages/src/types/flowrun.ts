/**
 * flowrun entity type
 */
export interface flowrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _workflow_value?: string;
  callingproductresourceid?: string;
  callingproductrunid?: string;
  callingproducttype?: string;
  clienttrackingid?: string;
  conversationid?: string;
  createdon?: string;
  duration?: number;
  endtime?: string;
  errorcode?: string;
  errormessage?: string;
  flowrunid?: string;
  importsequencenumber?: number;
  isprimary?: number;
  modernflowtype?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  parentrunid?: string;
  partitionid?: string;
  resourceid?: string;
  starttime?: string;
  status?: string;
  timezoneruleversionnumber?: number;
  triggertype?: string;
  ttlinseconds?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workflowid?: string;
}
