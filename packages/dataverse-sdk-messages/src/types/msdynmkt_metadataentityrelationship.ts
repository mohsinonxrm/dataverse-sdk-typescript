/**
 * msdynmkt_metadataentityrelationship entity type
 */
export interface msdynmkt_metadataentityrelationship {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdynmkt_hastomanyrelationship?: boolean;
  msdynmkt_hastoonerelationship?: boolean;
  msdynmkt_metadataentityrelationshipid?: string;
  msdynmkt_name?: string;
  msdynmkt_primaryentity?: string;
  msdynmkt_relatedentity?: string;
  msdynmkt_sourcetype?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
