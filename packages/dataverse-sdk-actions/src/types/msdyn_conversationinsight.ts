/**
 * msdyn_conversationinsight entity type
 */
export interface msdyn_conversationinsight {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_conversationid_value?: string;
  _msdyn_conversationinsighttarget_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_callaveragepause?: number;
  msdyn_callinsightduration?: number;
  msdyn_calllongestcustomermonologue?: number;
  msdyn_callswitchesperconversation?: number;
  msdyn_calltalkingspeed?: number;
  msdyn_calltalktolistenratio?: number;
  msdyn_conversationinsightid?: string;
  msdyn_copilotsummary?: string;
  msdyn_copilotsummaryrequestcontext?: string;
  msdyn_insights?: string;
  msdyn_insights_name?: string;
  msdyn_name?: string;
  msdyn_summary?: string;
  msdyn_transcriptwithinsights?: string;
  msdyn_transcriptwithinsights_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
