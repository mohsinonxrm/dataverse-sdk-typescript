/**
 * sharepointsite entity type
 */
export interface sharepointsite {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentsite_value?: string;
  _transactioncurrencyid_value?: string;
  absoluteurl?: string;
  createdon?: string;
  description?: string;
  exchangerate?: number;
  folderstructureentity?: string;
  importsequencenumber?: number;
  isdefault?: boolean;
  isgridpresent?: boolean;
  ispowerbisite?: boolean;
  lastvalidated?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  relativeurl?: string;
  servicetype?: number;
  sharepointsiteid?: string;
  sitecollectionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  userid?: string;
  utcconversiontimezonecode?: number;
  validationstatus?: number;
  validationstatuserrorcode?: number;
  versionnumber?: number;
}
