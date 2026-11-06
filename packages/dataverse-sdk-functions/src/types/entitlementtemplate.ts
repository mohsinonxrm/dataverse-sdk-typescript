/**
 * entitlementtemplate entity type
 */
export interface entitlementtemplate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _slaid_value?: string;
  _transactioncurrencyid_value?: string;
  allocationtypecode?: number;
  createdon?: string;
  decreaseremainingon?: number;
  description?: string;
  enddate?: string;
  entitlementtemplateid?: string;
  entitytype?: number;
  exchangerate?: number;
  importsequencenumber?: number;
  kbaccesslevel?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  restrictcasecreation?: boolean;
  startdate?: string;
  timezoneruleversionnumber?: number;
  totalterms?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
