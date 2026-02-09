/**
 * pricelevel entity type
 */
export interface pricelevel {
  description: string;
  paymentmethodcode: number;
  exchangerate: number;
  shippingmethodcode: number;
  modifiedon: string;
  overriddencreatedon: string;
  statecode: number;
  freighttermscode: number;
  _modifiedonbehalfby_value: string;
  versionnumber: number;
  _modifiedby_value: string;
  pricelevelid: string;
  timezoneruleversionnumber: number;
  msdyn_breakhoursbillable: boolean;
  _createdonbehalfby_value: string;
  createdon: string;
  statuscode: number;
  enddate: string;
  _organizationid_value: string;
  name: string;
  utcconversiontimezonecode: number;
  importsequencenumber: number;
  begindate: string;
  _createdby_value: string;
  _transactioncurrencyid_value: string;
}
