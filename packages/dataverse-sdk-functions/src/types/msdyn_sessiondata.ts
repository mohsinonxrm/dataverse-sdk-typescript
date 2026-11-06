/**
 * msdyn_sessiondata entity type
 */
export interface msdyn_sessiondata {
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
  msdyn_conversationid?: string;
  msdyn_customattribute1?: string;
  msdyn_customattribute2?: string;
  msdyn_customattribute3?: string;
  msdyn_customattribute4?: string;
  msdyn_customattribute5?: string;
  msdyn_externalcorrelationid?: string;
  msdyn_name?: string;
  msdyn_providersessionid?: string;
  msdyn_queueid?: string;
  msdyn_queuename?: string;
  msdyn_sessionadditionaldata?: string;
  msdyn_sessionagentassignedtimestamp?: string;
  msdyn_sessionchannel?: string;
  msdyn_sessioncreatedtimestamp?: string;
  msdyn_sessioncreationreason?: string;
  msdyn_sessiondataid?: string;
  msdyn_sessionqueueassignedtimestamp?: string;
  msdyn_ucisessionid?: string;
  msdyn_ucisessionname?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
