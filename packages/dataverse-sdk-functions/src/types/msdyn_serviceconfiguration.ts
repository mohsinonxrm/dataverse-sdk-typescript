/**
 * msdyn_serviceconfiguration entity type
 */
export interface msdyn_serviceconfiguration {
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
  msdyn_entitylogicalname?: string;
  msdyn_lookupattributeforsla?: string;
  msdyn_name?: string;
  msdyn_organizationid?: string;
  msdyn_pausestate?: string;
  msdyn_serviceconfigurationid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
