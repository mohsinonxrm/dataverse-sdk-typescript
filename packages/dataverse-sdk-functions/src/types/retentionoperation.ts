/**
 * retentionoperation entity type
 */
export interface retentionoperation {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _retentionconfigid_value?: string;
  additionaldetails?: string;
  asyncoperationid?: string;
  createdon?: string;
  criteria?: string;
  datasourcetype?: number;
  endtime?: string;
  failedcount?: number;
  fnotablename?: string;
  importsequencenumber?: number;
  lastmarkedversionnumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  pagingcookie?: string;
  retentioncount?: number;
  retentionoperationid?: string;
  rootentitylogicalname?: string;
  starttime?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
