/**
 * productsubstitute entity type
 */
export interface productsubstitute {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _productid_value?: string;
  _substitutedproductid_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  direction?: number;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  productsubstituteid?: string;
  salesrelationshiptype?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
