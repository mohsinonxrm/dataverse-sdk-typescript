/**
 * msdyn_aiagentstatus entity type
 */
export interface msdyn_aiagentstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentresolutiontimekpi_value?: string;
  _msdyn_lastemailactivity_value?: string;
  _msdyn_lastintent_value?: string;
  _msdyn_lastintentfamily_value?: string;
  _msdyn_lastintentgroup_value?: string;
  _msdyn_targetentity_value?: string;
  _organizationid_value?: string;
  _slaid_value?: string;
  _slainvokedid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  lastonholdtime?: string;
  modifiedon?: string;
  msdyn_agentexternalactionstatus?: number;
  msdyn_agentmode?: number;
  msdyn_agentrunstarttime?: string;
  msdyn_aiagentstatusid?: string;
  msdyn_currentaistatus?: string;
  msdyn_emailssent?: number;
  msdyn_escalatedon?: string;
  msdyn_fallbackreason?: number;
  msdyn_fallbackreasondetails?: string;
  msdyn_lastaction?: number;
  msdyn_lastoutboundcommunicationtype?: number;
  msdyn_lastrawintent?: string;
  msdyn_lastsuggestionsubtype?: number;
  msdyn_lastsuggestiontype?: number;
  msdyn_sentiment?: number;
  onholdtime?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
