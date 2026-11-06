import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_channelprofile entity type
 */
export interface msdyn_channelprofile {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_capacitywrapuptimeid_value?: string;
  _msdyn_surveyconfigid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  componentidunique?: string;
  componentstate?: number;
  createdon?: string;
  importsequencenumber?: number;
  iscustomizable?: BooleanManagedProperty;
  ismanaged?: boolean;
  modifiedon?: string;
  msdyn_agentexternalparticipantcontrolenabled?: boolean;
  msdyn_agentexternalparticipanttransfercontrolenabled?: boolean;
  msdyn_agentexternalteamsparticipantcontrolenabled?: boolean;
  msdyn_agentexternalteamsparticipanttransfercontrolenabled?: boolean;
  msdyn_allowedpresences?: string;
  msdyn_announceaveragewaittime?: boolean;
  msdyn_announcepositioninqueue?: boolean;
  msdyn_autocloseafterinactivity?: number;
  msdyn_averagewaittime_enabled?: boolean;
  msdyn_capacityformat?: number;
  msdyn_capacityrequired?: number;
  msdyn_channelprofileid?: string;
  msdyn_conversationmode?: number;
  msdyn_description?: string;
  msdyn_enableagentaffinity?: boolean;
  msdyn_isconversationcounterenabled?: boolean;
  msdyn_matchinglogic?: number;
  msdyn_maxdispositioncodesperconversation?: number;
  msdyn_name?: string;
  msdyn_positioninqueue_enabled?: boolean;
  msdyn_requireddispositioncodeforchannelprofileconversations?: boolean;
  msdyn_sessiontemplate_default?: string;
  msdyn_streamsource?: number;
  msdyn_usebridgetransferforpstntransfer?: boolean;
  msdyn_usebridgetransferforteamstransfer?: boolean;
  msdyn_useglobalsettingsforrequiringdispositioncode?: boolean;
  msdyn_workdistributionmode?: number;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
