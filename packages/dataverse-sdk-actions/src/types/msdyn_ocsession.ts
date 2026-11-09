import type { activitypointer } from "./activitypointer.js";

/**
 * msdyn_ocsession entity type
 */
export interface msdyn_ocsession extends activitypointer {
  _msdyn_activeagentgroupid_value?: string;
  _msdyn_cdsqueueid_value?: string;
  _msdyn_channelinstanceid_value?: string;
  _msdyn_channelprofileid_value?: string;
  _msdyn_liveworkitemid_value?: string;
  _msdyn_primarysession_value?: string;
  _msdyn_queueextensionid_value?: string;
  _msdyn_queueid_value?: string;
  importsequencenumber?: number;
  msdyn_agentacceptedon?: string;
  msdyn_agentassignedon?: string;
  msdyn_botengagementmode?: number;
  msdyn_channel?: number;
  msdyn_closurereason?: number;
  msdyn_optionalwrapuptimer?: number;
  msdyn_queueassignedon?: string;
  msdyn_queueassignedreason?: number;
  msdyn_routingfailurestage?: number;
  msdyn_sessionactivewrapuptimeinseconds?: number;
  msdyn_sessionclosedon?: string;
  msdyn_sessioncreatedon?: string;
  msdyn_sessioncreationreason?: number;
  msdyn_sessionid?: string;
  msdyn_sessionmodifiedon?: string;
  msdyn_sessionwrapuptimeinseconds?: number;
  msdyn_state?: number;
  msdyn_wrapupinitiatedon?: string;
  overriddencreatedon?: string;
}
