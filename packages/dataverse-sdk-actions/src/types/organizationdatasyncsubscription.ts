/**
 * organizationdatasyncsubscription entity type
 */
export interface organizationdatasyncsubscription {
  organizationdatasyncsubscriptionid?: string;
  modifiedon?: string;
  newfnotables?: string;
  endpointsettings?: string;
  entitysettings?: string;
  statecode?: number;
  versionnumber?: number;
  _createdonbehalfby_value?: string;
  partnerprefix?: string;
  needtocopyfilestoblob?: boolean;
  unsubscribedentities?: string;
  unsubscribedfnotables?: string;
  subscriptionentities?: string;
  createdon?: string;
  importsequencenumber?: number;
  _modifiedonbehalfby_value?: string;
  overriddencreatedon?: string;
  dataprocessingtype?: number;
  _organizationid_value?: string;
  _modifiedby_value?: string;
  utcconversiontimezonecode?: number;
  subscribedtoallentities?: boolean;
  aadapplicationid?: string;
  fullsynconly?: boolean;
  _createdby_value?: string;
  timezoneruleversionnumber?: number;
  subscriptionfnotables?: string;
  name?: string;
  entityfilters?: string;
  dataendpointpostingtype?: number;
  needcopyattachmentstoblob?: boolean;
  newentities?: string;
  blobpartitionby?: number;
  subscriptionendpointstatus?: number;
  cansyncallmetadata?: boolean;
  isoutofboxsubscription?: boolean;
  statuscode?: number;
  migrationstate?: number;
}
