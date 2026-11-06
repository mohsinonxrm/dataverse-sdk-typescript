/**
 * msdyn_screenrecording entity type
 */
export interface msdyn_screenrecording {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_screenrecordedagent_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_errorcode?: number;
  msdyn_isredactionenabled?: boolean;
  msdyn_name?: string;
  msdyn_screenrecordingdurationinminutes?: number;
  msdyn_screenrecordingendtime?: string;
  msdyn_screenrecordingfile?: string;
  msdyn_screenrecordingfile_name?: string;
  msdyn_screenrecordingid?: string;
  msdyn_screenrecordingmetadata?: string;
  msdyn_screenrecordingsessiontype?: number;
  msdyn_screenrecordingstarttime?: string;
  msdyn_screenrecordinguploadstatus?: number;
  msdyn_uploaddiagnosticmessage?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
