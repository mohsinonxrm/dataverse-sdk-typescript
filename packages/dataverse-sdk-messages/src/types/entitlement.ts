/**
 * entitlement entity type
 */
export interface entitlement {
  _accountid_value?: string;
  _contactid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _customerid_value?: string;
  _entitlementtemplateid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _slaid_value?: string;
  _transactioncurrencyid_value?: string;
  allocationtypecode?: number;
  createdon?: string;
  decreaseremainingon?: number;
  description?: string;
  emailaddress?: string;
  enddate?: string;
  entitlementid?: string;
  entitytype?: number;
  exchangerate?: number;
  importsequencenumber?: number;
  isdefault?: boolean;
  kbaccesslevel?: number;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  processid?: string;
  remainingterms?: number;
  restrictcasecreation?: boolean;
  stageid?: string;
  startdate?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  totalterms?: number;
  traversedpath?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
