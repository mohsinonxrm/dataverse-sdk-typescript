/**
 * importfile entity type
 */
export interface importfile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _importid_value?: string;
  _importmapid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _recordsownerid_value?: string;
  additionalheaderrow?: string;
  completedon?: string;
  content?: string;
  createdon?: string;
  datadelimitercode?: number;
  enableduplicatedetection?: boolean;
  entitykeyid?: string;
  failurecount?: number;
  fielddelimitercode?: number;
  filetypecode?: number;
  headerrow?: string;
  importfileid?: string;
  isfirstrowheader?: boolean;
  modifiedon?: string;
  name?: string;
  parsedtablecolumnprefix?: string;
  parsedtablecolumnsnumber?: number;
  parsedtablename?: string;
  partialfailurecount?: number;
  processcode?: number;
  processingstatus?: number;
  progresscounter?: number;
  relatedentitycolumns?: string;
  size?: string;
  source?: string;
  sourceentityname?: string;
  statecode?: number;
  statuscode?: number;
  successcount?: number;
  targetentityname?: string;
  timezoneruleversionnumber?: number;
  totalcount?: number;
  upsertmodecode?: number;
  usesystemmap?: boolean;
  utcconversiontimezonecode?: number;
}
