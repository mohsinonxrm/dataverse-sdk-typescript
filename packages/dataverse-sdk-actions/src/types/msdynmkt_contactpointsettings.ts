/**
 * msdynmkt_contactpointsettings entity type
 */
export interface msdynmkt_contactpointsettings {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdynmkt_contactablefields?: string;
  msdynmkt_contactpointsettingsid?: string;
  msdynmkt_contactpointtype?: number;
  msdynmkt_emailaddressfields?: string;
  msdynmkt_entityname?: string;
  msdynmkt_phonenumberfields?: string;
  msdynmkt_timezonefields?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
