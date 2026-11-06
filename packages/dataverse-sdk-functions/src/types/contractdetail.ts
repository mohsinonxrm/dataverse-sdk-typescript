/**
 * contractdetail entity type
 */
export interface contractdetail {
  _accountid_value?: string;
  _contactid_value?: string;
  _contractid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customerid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _productid_value?: string;
  _serviceaddress_value?: string;
  _transactioncurrencyid_value?: string;
  _uomid_value?: string;
  _uomscheduleid_value?: string;
  activeon?: string;
  allotmentsoverage?: number;
  allotmentsremaining?: number;
  allotmentsused?: number;
  contractdetailid?: string;
  contractstatecode?: number;
  createdon?: string;
  discount?: number;
  discount_base?: number;
  discountpercentage?: number;
  effectivitycalendar?: string;
  exchangerate?: number;
  expireson?: string;
  importsequencenumber?: number;
  initialquantity?: number;
  lineitemorder?: number;
  modifiedon?: string;
  net?: number;
  net_base?: number;
  overriddencreatedon?: string;
  price?: number;
  price_base?: number;
  productserialnumber?: string;
  rate?: number;
  rate_base?: number;
  servicecontractunitscode?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  title?: string;
  totalallotments?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
