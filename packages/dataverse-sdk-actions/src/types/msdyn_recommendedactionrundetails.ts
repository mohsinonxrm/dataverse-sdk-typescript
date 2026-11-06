/**
 * msdyn_recommendedactionrundetails entity type
 */
export interface msdyn_recommendedactionrundetails {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_rawactioncatalogueid_value?: string;
  _msdyn_sourceagentconfigid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_actionid?: string;
  msdyn_executiondetails?: string;
  msdyn_name?: string;
  msdyn_recommendedactionrundetailsid?: string;
  msdyn_retryafter?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
