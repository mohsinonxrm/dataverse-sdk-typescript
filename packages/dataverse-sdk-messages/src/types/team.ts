/**
 * team entity type
 */
export interface team {
  _administratorid_value?: string;
  _businessunitid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _delegatedauthorizationid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _queueid_value?: string;
  _regardingobjectid_value?: string;
  _teamtemplateid_value?: string;
  _transactioncurrencyid_value?: string;
  azureactivedirectoryobjectid?: string;
  createdon?: string;
  description?: string;
  emailaddress?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  isdefault?: boolean;
  issastokenset?: boolean;
  membershiptype?: number;
  modifiedon?: string;
  name?: string;
  organizationid?: string;
  overriddencreatedon?: string;
  processid?: string;
  sharelinkqualifier?: string;
  stageid?: string;
  systemmanaged?: boolean;
  teamid?: string;
  teamtype?: number;
  traversedpath?: string;
  versionnumber?: number;
  yominame?: string;
}
