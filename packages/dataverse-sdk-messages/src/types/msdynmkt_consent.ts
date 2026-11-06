/**
 * msdynmkt_consent entity type
 */
export interface msdynmkt_consent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdynmkt_allowemail?: number;
  msdynmkt_allowsms?: number;
  msdynmkt_allowtracking?: number;
  msdynmkt_changesource?: number;
  msdynmkt_consentid?: string;
  msdynmkt_profileid?: string;
  msdynmkt_reason?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
