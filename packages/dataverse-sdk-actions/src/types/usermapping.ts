/**
 * usermapping entity type
 */
export interface usermapping {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  _transactioncurrencyid_value?: string;
  claimtype?: string;
  createdon?: string;
  exchangerate?: number;
  modifiedon?: string;
  partnerapplicationtype?: number;
  systemuserattributename?: string;
  timezoneruleversionnumber?: number;
  usermappingid?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
