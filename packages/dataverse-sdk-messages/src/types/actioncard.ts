/**
 * actioncard entity type
 */
export interface actioncard {
  _cardtypeid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _parentregardingobjectid_value?: string;
  _recordid_value?: string;
  _regardingobjectid_value?: string;
  _transactioncurrencyid_value?: string;
  actioncardid?: string;
  cardtype?: number;
  createdon?: string;
  data?: string;
  description?: string;
  exchangerate?: number;
  expirydate?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actioncardregardingid?: string;
  msdyn_regardingobjectid?: string;
  msdyn_regardingobjectlogicalname?: string;
  overriddencreatedon?: string;
  parentregardingobjectiddata?: string;
  priority?: number;
  recordidobjecttypecode2?: number;
  referencetokens?: string;
  source?: number;
  startdate?: string;
  state?: number;
  title?: string;
  versionnumber?: number;
  visibility?: boolean;
}
