/**
 * msdyn_precomputedrates entity type
 */
export interface msdyn_precomputedrates {
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
  msdyn_additionalparameters?: string;
  msdyn_fraudsterdetectionalertrate?: number;
  msdyn_kbasuccessrate?: number;
  msdyn_playbackdetectionalertrate?: number;
  msdyn_precomputedratesid?: string;
  msdyn_primarycolumn?: string;
  msdyn_smsotpsuccessrate?: number;
  msdyn_syntheticspeechalertrate?: number;
  msdyn_voiceauthfalseacceptrate?: number;
  msdyn_voiceauthsuccessrate?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
