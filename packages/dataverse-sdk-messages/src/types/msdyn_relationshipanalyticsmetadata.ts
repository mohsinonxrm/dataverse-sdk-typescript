/**
 * msdyn_relationshipanalyticsmetadata entity type
 */
export interface msdyn_relationshipanalyticsmetadata {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_absoluteemailweight?: number;
  msdyn_absolutemeetingweight?: number;
  msdyn_absolutephonecallweight?: number;
  msdyn_absolutetaskweight?: number;
  msdyn_communicationfrequency?: number;
  msdyn_fairhealththreshold?: number;
  msdyn_goodhealththreshold?: number;
  msdyn_healthenabled?: boolean;
  msdyn_healthscoresdistribution?: string;
  msdyn_name?: string;
  msdyn_provisioningstatus?: number;
  msdyn_relationshipanalyticsmetadataid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
