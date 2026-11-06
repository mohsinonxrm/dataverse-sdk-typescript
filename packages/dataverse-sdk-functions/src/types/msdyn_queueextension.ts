import type { BooleanManagedProperty } from "./BooleanManagedProperty.js";

/**
 * msdyn_queueextension entity type
 */
export interface msdyn_queueextension {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationid_value?: string;
  _msdyn_queueid_value?: string;
  _msdyn_sourcequeue_value?: string;
  _msdyn_targetqueue_value?: string;
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
  msdyn_activechattime?: number;
  msdyn_activetime?: number;
  msdyn_activewrapuptime?: number;
  msdyn_agentacceptedon?: string;
  msdyn_agentassignedon?: string;
  msdyn_closedon?: string;
  msdyn_closurereason?: string;
  msdyn_creationreason?: string;
  msdyn_creationsegmenttype?: number;
  msdyn_endtime?: string;
  msdyn_firstwaitstartedon?: string;
  msdyn_firstwaittimeinseconds?: number;
  msdyn_handletime?: number;
  msdyn_holdtime?: number;
  msdyn_inactivetime?: number;
  msdyn_isabandoned?: boolean;
  msdyn_name?: string;
  msdyn_queueextensionid?: string;
  msdyn_segmenttype?: number;
  msdyn_startactivetime?: string;
  msdyn_startactivewrapuptime?: string;
  msdyn_startholdtime?: string;
  msdyn_startinactivetime?: string;
  msdyn_starttalktime?: string;
  msdyn_starttime?: string;
  msdyn_talktime?: number;
  msdyn_waitstartedon?: string;
  overriddencreatedon?: string;
  overwritetime?: string;
  solutionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
