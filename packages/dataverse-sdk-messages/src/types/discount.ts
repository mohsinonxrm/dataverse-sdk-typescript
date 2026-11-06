/**
 * discount entity type
 */
export interface discount {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _discounttypeid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _transactioncurrencyid_value?: string;
  amount?: number;
  amount_base?: number;
  createdon?: string;
  discountid?: string;
  exchangerate?: number;
  highquantity?: number;
  importsequencenumber?: number;
  isamounttype?: boolean;
  lowquantity?: number;
  modifiedon?: string;
  name?: string;
  organizationid?: string;
  overriddencreatedon?: string;
  percentage?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
