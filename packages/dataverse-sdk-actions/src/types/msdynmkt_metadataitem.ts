/**
 * msdynmkt_metadataitem entity type
 */
export interface msdynmkt_metadataitem {
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
  msdynmkt_datatype?: number;
  msdynmkt_datetimebehavior?: number;
  msdynmkt_displayname?: string;
  msdynmkt_fullmetadataasjson?: string;
  msdynmkt_iconpath?: string;
  msdynmkt_isrequired?: boolean;
  msdynmkt_issecured?: boolean;
  msdynmkt_languagecode?: number;
  msdynmkt_logicalname?: string;
  msdynmkt_metadataitemid?: string;
  msdynmkt_name?: string;
  msdynmkt_nativeid?: string;
  msdynmkt_navigationpathsasjson?: string;
  msdynmkt_referencedsourcesasjson?: string;
  msdynmkt_sourcedisplayname?: string;
  msdynmkt_sourceisvirtual?: boolean;
  msdynmkt_sourcelogicalname?: string;
  msdynmkt_sourceprimaryid?: string;
  msdynmkt_sourcesetname?: string;
  msdynmkt_sourcetype?: number;
  msdynmkt_sourcevirtualtabletype?: number;
  msdynmkt_stringformattype?: number;
  msdynmkt_targetaudienceasjson?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
