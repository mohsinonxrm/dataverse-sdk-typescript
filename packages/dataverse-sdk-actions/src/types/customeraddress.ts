/**
 * customeraddress entity type
 */
export interface customeraddress {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owninguser_value?: string;
  _parentid_value?: string;
  _transactioncurrencyid_value?: string;
  addressnumber?: number;
  addresstypecode?: number;
  city?: string;
  composite?: string;
  country?: string;
  county?: string;
  createdon?: string;
  customeraddressid?: string;
  exchangerate?: number;
  fax?: string;
  freighttermscode?: number;
  importsequencenumber?: number;
  latitude?: number;
  line1?: string;
  line2?: string;
  line3?: string;
  longitude?: number;
  modifiedon?: string;
  name?: string;
  objecttypecode?: string;
  overriddencreatedon?: string;
  postalcode?: string;
  postofficebox?: string;
  primarycontactname?: string;
  shippingmethodcode?: number;
  stateorprovince?: string;
  telephone1?: string;
  telephone2?: string;
  telephone3?: string;
  timezoneruleversionnumber?: number;
  upszone?: string;
  utcconversiontimezonecode?: number;
  utcoffset?: number;
  versionnumber?: number;
}
