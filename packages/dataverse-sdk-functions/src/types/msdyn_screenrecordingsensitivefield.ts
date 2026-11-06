/**
 * msdyn_screenrecordingsensitivefield entity type
 */
export interface msdyn_screenrecordingsensitivefield {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_screenrecordingconfigid_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_category?: number;
  msdyn_fieldkey?: string;
  msdyn_isoob?: boolean;
  msdyn_isselected?: boolean;
  msdyn_name?: string;
  msdyn_regularexpression?: string;
  msdyn_screenrecordingsensitivefieldid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
