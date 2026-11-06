/**
 * msdyn_screenrecordingresource entity type
 */
export interface msdyn_screenrecordingresource {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_managedidentityid_value?: string;
  _msdyn_screenrecordingconfigid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_lastprovisionedon?: string;
  msdyn_name?: string;
  msdyn_provisioningerror?: string;
  msdyn_provisioningstatus?: number;
  msdyn_resourcecategory?: number;
  msdyn_resourcemetadata?: string;
  msdyn_screenrecordingresourceid?: string;
  msdyn_service?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
