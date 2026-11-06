/**
 * msdyn_autocaseclosureagentmonitoring entity type
 */
export interface msdyn_autocaseclosureagentmonitoring {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_casefollowupandclosureconfigurationid_value?: string;
  _msdyn_incidentid_value?: string;
  _msdyn_regarding_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_autocaseclosureagentmonitoringid?: string;
  msdyn_didcustomerconfirmcaseresolution?: number;
  msdyn_didcustomerreplytoagentemail?: number;
  msdyn_isfullautonomous?: boolean;
  msdyn_name?: string;
  msdyn_nextaction?: number;
  msdyn_nextactiondue?: string;
  msdyn_strikecount?: number;
  msdyn_wasfollowupdirectlyinvoked?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
