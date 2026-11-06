/**
 * bulkdeleteoperation entity type
 */
export interface bulkdeleteoperation {
  _asyncoperationid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  bulkdeleteoperationid?: string;
  childrecordsdeletedbreakdown?: string;
  childrecordsdeletedcount?: number;
  createdon?: string;
  failurecount?: number;
  isrecurring?: boolean;
  modifiedon?: string;
  name?: string;
  nextrun?: string;
  orderedquerysetxml?: string;
  parentbulkdeletepolicyid?: string;
  processingqeindex?: number;
  statecode?: number;
  statuscode?: number;
  successcount?: number;
  timezoneruleversionnumber?: number;
  totalsizecleanedupinbytes?: number;
  utcconversiontimezonecode?: number;
}
