/**
 * msdynmkt_contactpointconsent2 entity type
 */
export interface msdynmkt_contactpointconsent2 {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdynmkt_consenttypevalue?: number;
  msdynmkt_contactpointconsent2id?: string;
  msdynmkt_contactpointtype?: number;
  msdynmkt_contactpointvalue?: string;
  msdynmkt_logicalreason?: number;
  msdynmkt_migrationtimestamp?: string;
  msdynmkt_modifiedonbehalf?: string;
  msdynmkt_reason?: string;
  msdynmkt_source?: number;
  msdynmkt_uionly_value_marketingmessage?: number;
  msdynmkt_uionly_value_tracking?: number;
  msdynmkt_value?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
