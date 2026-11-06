/**
 * msdyn_sessionparticipant entity type
 */
export interface msdyn_sessionparticipant {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentid_value?: string;
  _msdyn_cdsqueueid_value?: string;
  _msdyn_omnichannelsession_value?: string;
  _msdyn_queueextensionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_activechattime?: number;
  msdyn_activedirectoryuserid?: string;
  msdyn_activetime?: number;
  msdyn_activewrapuptime?: number;
  msdyn_addedon?: string;
  msdyn_assignreason?: string;
  msdyn_consultmode?: number;
  msdyn_conversationaccess?: number;
  msdyn_externalparticipantchannel?: string;
  msdyn_externalparticipantchanneltype?: number;
  msdyn_holdtime?: number;
  msdyn_idletime?: number;
  msdyn_inactivetime?: number;
  msdyn_iscapacityblocking?: boolean;
  msdyn_joinedon?: string;
  msdyn_lastupdatedon?: string;
  msdyn_lefton?: string;
  msdyn_leftonreason?: string;
  msdyn_mode?: number;
  msdyn_modifiedon?: string;
  msdyn_name?: string;
  msdyn_sessionparticipantid?: string;
  msdyn_startactivetime?: string;
  msdyn_startactivewrapuptime?: string;
  msdyn_startholdtime?: string;
  msdyn_startidletime?: string;
  msdyn_startinactivetime?: string;
  msdyn_starttalktime?: string;
  msdyn_talktime?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
