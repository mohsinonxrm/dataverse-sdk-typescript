/**
 * unstructuredfilesearchrecordstatus entity type
 */
export interface unstructuredfilesearchrecordstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _searchconfigurationid_value?: string;
  _unstructuredfilesearchrecordid_value?: string;
  createdon?: string;
  fileid?: string;
  importsequencenumber?: number;
  indexingissuedetails?: string;
  indexingissuetype?: string;
  indexingstatus?: number;
  ingestionbatchid?: string;
  ingestionissuedetails?: string;
  ingestionissuetype?: string;
  ingestionstatus?: number;
  lastindexingtimestamp?: string;
  lastingestiontimestamp?: string;
  lastsuccessfulindexingtimestamp?: string;
  lastsuccessfulingestiontimestamp?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  unstructuredfilesearchrecordstatusid?: string;
  unstructuredfilesearchrecordstatusname?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
