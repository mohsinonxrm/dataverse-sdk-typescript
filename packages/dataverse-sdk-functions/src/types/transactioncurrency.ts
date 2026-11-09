/**
 * transactioncurrency entity type
 */
export interface transactioncurrency {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  currencyname?: string;
  currencyprecision?: number;
  currencysymbol?: string;
  currencytype?: number;
  entityimage?: string;
  entityimage_timestamp?: number;
  entityimage_url?: string;
  entityimageid?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  isocurrencycode?: string;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  transactioncurrencyid?: string;
  versionnumber?: number;
}
