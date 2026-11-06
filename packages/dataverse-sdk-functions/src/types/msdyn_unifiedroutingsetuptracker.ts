/**
 * msdyn_unifiedroutingsetuptracker entity type
 */
export interface msdyn_unifiedroutingsetuptracker {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_enableunifiedrouting?: boolean;
  msdyn_errorcode?: number;
  msdyn_errormessage?: string;
  msdyn_executionstatus?: number;
  msdyn_issuccessnotificationdisplayed?: boolean;
  msdyn_isteachingbubbledisplayed?: boolean;
  msdyn_name?: string;
  msdyn_servicerequestid?: string;
  msdyn_skipprovisioning?: boolean;
  msdyn_token?: string;
  msdyn_transactionid?: string;
  msdyn_unifiedroutingsetuptrackerid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
