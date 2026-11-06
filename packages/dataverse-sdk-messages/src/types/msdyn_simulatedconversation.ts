/**
 * msdyn_simulatedconversation entity type
 */
export interface msdyn_simulatedconversation {
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
  msdyn_averagehandletimeinsec?: number;
  msdyn_averagewaittimeinsec?: number;
  msdyn_conversationid?: string;
  msdyn_isresolved?: boolean;
  msdyn_name?: string;
  msdyn_sentiment?: number;
  msdyn_simulatedconversationid?: string;
  msdyn_simulationrunid?: string;
  msdyn_transcriptid?: string;
  overriddencreatedon?: string;
  partitionid?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  ttlinseconds?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
