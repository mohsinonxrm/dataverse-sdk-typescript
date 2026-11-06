/**
 * list entity type
 */
export interface list {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  cost?: number;
  cost_base?: number;
  createdfromcode?: number;
  createdon?: string;
  description?: string;
  donotsendonoptout?: boolean;
  exchangerate?: number;
  ignoreinactivelistmembers?: boolean;
  importsequencenumber?: number;
  lastusedon?: string;
  listid?: string;
  listname?: string;
  lockstatus?: boolean;
  membercount?: number;
  membertype?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  processedmembercount?: number;
  processfetchxml?: string;
  processid?: string;
  purpose?: string;
  query?: string;
  source?: string;
  stageid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  type?: boolean;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
