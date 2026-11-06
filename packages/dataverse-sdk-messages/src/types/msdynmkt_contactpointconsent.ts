/**
 * msdynmkt_contactpointconsent entity type
 */
export interface msdynmkt_contactpointconsent {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdynmkt_consentstatus?: number;
  msdynmkt_consenttype?: number;
  msdynmkt_contactpoint?: string;
  msdynmkt_contactpointconsentid?: string;
  msdynmkt_reason?: number;
  msdynmkt_source?: number;
  msdynmkt_trackingstatus?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
