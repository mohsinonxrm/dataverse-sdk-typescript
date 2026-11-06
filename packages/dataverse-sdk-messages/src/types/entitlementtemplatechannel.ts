/**
 * entitlementtemplatechannel entity type
 */
export interface entitlementtemplatechannel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _entitlementtemplateid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _transactioncurrencyid_value?: string;
  channel?: number;
  createdon?: string;
  entitlementtemplatechannelid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  timezoneruleversionnumber?: number;
  totalterms?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
