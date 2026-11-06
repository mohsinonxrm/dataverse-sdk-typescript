/**
 * sharedworkspacepool entity type
 */
export interface sharedworkspacepool {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  claimed?: boolean;
  createdon?: string;
  discoveryendpoint?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  ordererendpoint?: string;
  overriddencreatedon?: string;
  sharedworkspacepoolid?: string;
  statecode?: number;
  statuscode?: number;
  storageendpoint?: string;
  tenantid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
