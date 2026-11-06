/**
 * productpricelevel entity type
 */
export interface productpricelevel {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _discounttypeid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _pricelevelid_value?: string;
  _productid_value?: string;
  _transactioncurrencyid_value?: string;
  _uomid_value?: string;
  _uomscheduleid_value?: string;
  amount?: number;
  amount_base?: number;
  createdon?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  modifiedon?: string;
  organizationid?: string;
  overriddencreatedon?: string;
  percentage?: number;
  pricingmethodcode?: number;
  processid?: string;
  productnumber?: string;
  productpricelevelid?: string;
  quantitysellingcode?: number;
  roundingoptionamount?: number;
  roundingoptionamount_base?: number;
  roundingoptioncode?: number;
  roundingpolicycode?: number;
  stageid?: string;
  timezoneruleversionnumber?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
