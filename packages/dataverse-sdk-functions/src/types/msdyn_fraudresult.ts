/**
 * msdyn_fraudresult entity type
 */
export interface msdyn_fraudresult {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_callerchannelaudiosampleid_value?: string;
  _msdyn_conversationid_value?: string;
  _msdyn_matchedfraudsterdetectionvoiceprintid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_additionalparameters?: string;
  msdyn_agentid?: string;
  msdyn_authenticationdecision?: number;
  msdyn_calibrationid?: string;
  msdyn_engineversion?: string;
  msdyn_fraudresultid?: string;
  msdyn_fraudresultname?: string;
  msdyn_fraudrisk?: number;
  msdyn_fraudscore?: number;
  msdyn_fraudsterdetectioncheckresult?: number;
  msdyn_fraudsterdetectionsetting?: string;
  msdyn_fraudthreshold?: number;
  msdyn_handlertype?: number;
  msdyn_matchedfraudsterdetectionvoiceprintname?: string;
  msdyn_playbackresult?: number;
  msdyn_playbackscore?: number;
  msdyn_playbacksetting?: string;
  msdyn_playbackthreshold?: number;
  msdyn_profilekey?: number;
  msdyn_smsotpresult?: number;
  msdyn_syntheticspeechresult?: number;
  msdyn_syntheticspeechscore?: number;
  msdyn_syntheticspeechsetting?: string;
  msdyn_syntheticspeechthreshold?: number;
  msdyn_useridentifier?: string;
  msdyn_userphonenumber?: string;
  msdyn_voiceauthresult?: number;
  msdyn_voiceauthscore?: number;
  msdyn_voiceauththreshold?: number;
  msdyn_voiceverificationsetting?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
