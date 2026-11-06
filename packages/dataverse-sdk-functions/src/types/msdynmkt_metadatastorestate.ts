/**
 * msdynmkt_metadatastorestate entity type
 */
export interface msdynmkt_metadatastorestate {
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
  msdynmkt_cjoeventslastcheckedontimestamp?: string;
  msdynmkt_dataversetablelastcheckedontimestamp?: string;
  msdynmkt_maxstoreageinseconds?: number;
  msdynmkt_metadatastorestateid?: string;
  msdynmkt_name?: string;
  msdynmkt_storemajorversion?: number;
  msdynmkt_storeminorversion?: number;
  msdynmkt_storestate?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
