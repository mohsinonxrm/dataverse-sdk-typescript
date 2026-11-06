/**
 * syncerror entity type
 */
export interface syncerror {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _regardingobjectid_value?: string;
  action?: string;
  actiondata?: string;
  createdon?: string;
  description?: string;
  errorcode?: string;
  errordetail?: string;
  errormessage?: string;
  errortime?: string;
  errortype?: number;
  modifiedon?: string;
  name?: string;
  requestdata?: string;
  statecode?: number;
  statuscode?: number;
  syncerrorid?: string;
  versionnumber?: number;
}
