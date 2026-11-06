/**
 * msdyn_recording entity type
 */
export interface msdyn_recording {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_appointment_activity_value?: string;
  _msdyn_phone_call_activity_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_ci_comments?: string;
  msdyn_ci_id?: string;
  msdyn_ci_insights_json?: string;
  msdyn_ci_keywords?: string;
  msdyn_ci_tags?: string;
  msdyn_ci_transcript?: string;
  msdyn_ci_transcript_json?: string;
  msdyn_ci_translated_transcript?: string;
  msdyn_ci_translated_transcript_json?: string;
  msdyn_ci_url?: string;
  msdyn_name?: string;
  msdyn_recordingid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
