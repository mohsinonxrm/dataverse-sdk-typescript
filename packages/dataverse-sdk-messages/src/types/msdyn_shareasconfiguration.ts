/**
 * msdyn_shareasconfiguration entity type
 */
export interface msdyn_shareasconfiguration {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_forecastconfigurationid_value?: string;
  _msdyn_sharedbyuserid_value?: string;
  _msdyn_sharedwithuserid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_hierarchyrecordid?: string;
  msdyn_shareasconfigurationid?: string;
  msdyn_shareashashid?: string;
  msdyn_sharedon?: string;
  msdyn_sharelevel?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
