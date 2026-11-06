/**
 * territory entity type
 */
export interface territory {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _managerid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _parentterritoryid_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  description?: string;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  territoryid?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
