/**
 * entitlementchannel entity type
 */
export interface entitlementchannel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entitlementid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  channel?: number;
  createdon?: string;
  entitlementchannelid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  remainingterms?: number;
  timezoneruleversionnumber?: number;
  totalterms?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
