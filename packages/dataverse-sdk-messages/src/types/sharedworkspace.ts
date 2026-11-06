/**
 * sharedworkspace entity type
 */
export interface sharedworkspace {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  accesstoken?: string;
  createdon?: string;
  discoveryendpoint?: string;
  importsequencenumber?: number;
  lastmanaged?: string;
  lastused?: string;
  modifiedon?: string;
  name?: string;
  ordererendpoint?: string;
  overriddencreatedon?: string;
  sharedworkspaceid?: string;
  statecode?: number;
  statuscode?: number;
  storageendpoint?: string;
  tenantid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
  workspaceschema?: string;
  workspaceschemaversion?: string;
}
