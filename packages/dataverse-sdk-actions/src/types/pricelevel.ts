/**
 * pricelevel entity type
 */
export interface pricelevel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _transactioncurrencyid_value?: string;
  begindate?: string;
  createdon?: string;
  description?: string;
  enddate?: string;
  exchangerate?: number;
  freighttermscode?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  paymentmethodcode?: number;
  pricelevelid?: string;
  shippingmethodcode?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
