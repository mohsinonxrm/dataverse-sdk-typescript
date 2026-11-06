/**
 * msdyn_autocaseclosureagentactivity entity type
 */
export interface msdyn_autocaseclosureagentactivity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_activityid_value?: string;
  _msdyn_autocaseclosureagentgeneratedemailid_value?: string;
  _msdyn_autocaseclosureagentmonitoringid_value?: string;
  _msdyn_casefollowupandclosureconfigurationid_value?: string;
  _msdyn_incidentid_value?: string;
  _msdyn_regarding_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activitytype?: number;
  msdyn_aisimulationrunid?: string;
  msdyn_autocaseclosureagentactivityid?: string;
  msdyn_followupcount?: number;
  msdyn_isfullautonomous?: boolean;
  msdyn_name?: string;
  msdyn_retrycount?: number;
  msdyn_triggertrackingid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
