/**
 * msdyn_ocrecording entity type
 */
export interface msdyn_ocrecording {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_liveworkitemid_value?: string;
  _msdyn_recordingtarget_value?: string;
  _msdyn_sourcelanguage_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_applicationid?: string;
  msdyn_mediauri?: string;
  msdyn_name?: string;
  msdyn_ocrecordingid?: string;
  msdyn_originalstored?: boolean;
  msdyn_platformrecordingid?: string;
  msdyn_recording?: string;
  msdyn_recording_name?: string;
  msdyn_recordingmetadata?: string;
  msdyn_recordingmetadata_name?: string;
  msdyn_redactionapplied?: boolean;
  msdyn_redactionenabled?: boolean;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
