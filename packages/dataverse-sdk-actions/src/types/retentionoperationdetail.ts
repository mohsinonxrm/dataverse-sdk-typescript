/**
 * retentionoperationdetail entity type
 */
export interface retentionoperationdetail {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _retentionoperationid_value?: string;
  createdon?: string;
  entitylogicalname?: string;
  failedcount?: number;
  fnotablename?: string;
  importsequencenumber?: number;
  isrootentity?: boolean;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  retentioncount?: number;
  retentionoperationdetailid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
