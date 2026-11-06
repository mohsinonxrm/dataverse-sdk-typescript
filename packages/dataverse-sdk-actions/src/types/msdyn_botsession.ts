/**
 * msdyn_botsession entity type
 */
export interface msdyn_botsession {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_botid_value?: string;
  _msdyn_sessionid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_botsessionid?: string;
  msdyn_convtranscriptid?: string;
  msdyn_csatscore?: number;
  msdyn_endedon?: string;
  msdyn_isengaged?: boolean;
  msdyn_lastsessionoutcome?: number;
  msdyn_lastsessionoutcomereason?: number;
  msdyn_mcsbotsessionid?: string;
  msdyn_name?: string;
  msdyn_outcome?: number;
  msdyn_outcomereason?: number;
  msdyn_sourcesessionid?: string;
  msdyn_startedon?: string;
  msdyn_topicid?: string;
  msdyn_topicname?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
