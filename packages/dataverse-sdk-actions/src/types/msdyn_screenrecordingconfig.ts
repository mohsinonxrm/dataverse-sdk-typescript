/**
 * msdyn_screenrecordingconfig entity type
 */
export interface msdyn_screenrecordingconfig {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_audiorecording?: boolean;
  msdyn_automaticallyrecord?: boolean;
  msdyn_captureallmonitors?: boolean;
  msdyn_contextawarerecording?: boolean;
  msdyn_dataredactionenabled?: boolean;
  msdyn_displayredborder?: boolean;
  msdyn_enablescreenrecording?: boolean;
  msdyn_includesystemaudio?: boolean;
  msdyn_name?: string;
  msdyn_screenrecordingconfigid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
