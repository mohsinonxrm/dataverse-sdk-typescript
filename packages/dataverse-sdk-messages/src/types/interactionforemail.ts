/**
 * interactionforemail entity type
 */
export interface interactionforemail {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _transactioncurrencyid_value?: string;
  createdon?: string;
  emailactivityid?: string;
  emailaddress?: string;
  emailinteractionreplyid?: string;
  emailinteractiontime?: string;
  exchangerate?: number;
  importsequencenumber?: number;
  interactedcomponenttext?: string;
  interactionforemailid?: string;
  interactionlocation?: string;
  interactionpartyid?: string;
  interactionrepliedby?: string;
  interactionreplyid?: string;
  interactiontype?: number;
  interactionuseragent?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
