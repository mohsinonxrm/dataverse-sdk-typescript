/**
 * organizationdatasyncsubscription entity type
 */
export interface organizationdatasyncsubscription {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  aadapplicationid?: string;
  blobpartitionby?: number;
  cansyncallmetadata?: boolean;
  createdon?: string;
  dataendpointpostingtype?: number;
  dataprocessingtype?: number;
  endpointsettings?: string;
  entityfilters?: string;
  entitysettings?: string;
  fullsynconly?: boolean;
  importsequencenumber?: number;
  isoutofboxsubscription?: boolean;
  migrationstate?: number;
  modifiedon?: string;
  name?: string;
  needcopyattachmentstoblob?: boolean;
  needtocopyfilestoblob?: boolean;
  newentities?: string;
  newfnotables?: string;
  organizationdatasyncsubscriptionid?: string;
  overriddencreatedon?: string;
  partnerprefix?: string;
  statecode?: number;
  statuscode?: number;
  subscribedtoallentities?: boolean;
  subscriptionendpointstatus?: number;
  subscriptionentities?: string;
  subscriptionfnotables?: string;
  timezoneruleversionnumber?: number;
  unsubscribedentities?: string;
  unsubscribedfnotables?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
