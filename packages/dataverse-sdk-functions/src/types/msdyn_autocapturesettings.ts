/**
 * msdyn_autocapturesettings entity type
 */
export interface msdyn_autocapturesettings {
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
  msdyn_DontShowSettingStatus?: string;
  msdyn_autocapture?: boolean;
  msdyn_autocapturesettingsid?: string;
  msdyn_autocapturev1?: boolean;
  msdyn_automaticactivityupdate?: boolean;
  msdyn_calendar?: boolean;
  msdyn_contacts?: boolean;
  msdyn_defaultassociation?: string;
  msdyn_emails?: boolean;
  msdyn_meetings?: boolean;
  msdyn_name?: string;
  msdyn_organizationid?: string;
  msdyn_settingsuiaction?: string;
  msdyn_userid?: string;
  msdyn_v1termsandconditionscount?: string;
  msdyn_v2termsandconditionscount?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
