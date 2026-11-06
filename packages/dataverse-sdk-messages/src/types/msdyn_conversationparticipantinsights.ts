/**
 * msdyn_conversationparticipantinsights entity type
 */
export interface msdyn_conversationparticipantinsights {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationaggregatedinsights_value?: string;
  _msdyn_user_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_aadid?: string;
  msdyn_avgpausebeforespeakinginms?: number;
  msdyn_channelindex?: number;
  msdyn_conversationparticipantinsightsid?: string;
  msdyn_displayname?: string;
  msdyn_email?: string;
  msdyn_longestmonologueinms?: number;
  msdyn_name?: string;
  msdyn_participantid?: string;
  msdyn_participantrole?: number;
  msdyn_participationmethod?: number;
  msdyn_phonenumber?: string;
  msdyn_switchcount?: number;
  msdyn_talkingspeedwordspermin?: number;
  msdyn_talktolistenratio?: number;
  msdyn_tenantid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
