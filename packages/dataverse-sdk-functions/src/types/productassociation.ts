/**
 * productassociation entity type
 */
export interface productassociation {
  _associatedproduct_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _productid_value?: string;
  _transactioncurrencyid_value?: string;
  _uomid_value?: string;
  createdon?: string;
  dmtimportstate?: number;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  productassociationid?: string;
  productisrequired?: number;
  propertycustomizationstatus?: number;
  quantity?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
