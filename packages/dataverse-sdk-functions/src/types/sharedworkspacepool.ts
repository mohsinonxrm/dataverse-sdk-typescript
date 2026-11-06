/**
 * sharedworkspacepool entity type
 */
export interface sharedworkspacepool {
  discoveryendpoint?: string;
  ordererendpoint?: string;
  name?: string;
  modifiedon?: string;
  createdon?: string;
  tenantid?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  claimed?: boolean;
  versionnumber?: number;
  statuscode?: number;
  utcconversiontimezonecode?: number;
  _createdonbehalfby_value?: string;
  _modifiedonbehalfby_value?: string;
  _modifiedby_value?: string;
  storageendpoint?: string;
  sharedworkspacepoolid?: string;
  statecode?: number;
  _createdby_value?: string;
  importsequencenumber?: number;
}
