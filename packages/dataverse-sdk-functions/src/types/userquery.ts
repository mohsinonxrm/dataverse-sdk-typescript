/**
 * userquery entity type
 */
export interface userquery {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentqueryid_value?: string;
  advancedgroupby?: string;
  columnsetxml?: string;
  conditionalformatting?: string;
  createdon?: string;
  description?: string;
  enablecrosspartition?: boolean;
  fetchxml?: string;
  layoutjson?: string;
  layoutxml?: string;
  modifiedon?: string;
  name?: string;
  offlinesqlquery?: string;
  querytype?: number;
  returnedtypecode?: string;
  statecode?: number;
  statuscode?: number;
  userqueryid?: string;
  versionnumber?: number;
}
