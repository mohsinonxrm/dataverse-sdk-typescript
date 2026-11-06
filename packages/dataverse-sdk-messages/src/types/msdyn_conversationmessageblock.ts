/**
 * msdyn_conversationmessageblock entity type
 */
export interface msdyn_conversationmessageblock {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentid_value?: string;
  _msdyn_agentresponsesessionid_value?: string;
  _msdyn_customermessagesessionid_value?: string;
  _msdyn_ocliveworkitemid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentmessagetime?: string;
  msdyn_agentresponsetimeadjforoh?: number;
  msdyn_agentresponsetimenotadjforoh?: number;
  msdyn_conversationmessageblockid?: string;
  msdyn_customermessagetimestamp?: string;
  msdyn_inboundmessagecountoutsideoh?: number;
  msdyn_inboundmessagecountwithinoh?: number;
  msdyn_isfirstresponsetime?: boolean;
  msdyn_lastagentmessagetime?: string;
  msdyn_lastcustomermessagetimestamp?: string;
  msdyn_name?: string;
  msdyn_outboundmessagecountoutsideoh?: number;
  msdyn_outboundmessagecountwithinoh?: number;
  msdyn_responsetimeadjforoh?: number;
  msdyn_responsetimenotadjforoh?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
