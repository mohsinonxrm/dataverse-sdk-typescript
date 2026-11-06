/**
 * msdyn_salesagentrun entity type
 */
export interface msdyn_salesagentrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_previoussalesagentrunid_value?: string;
  _msdyn_regardingid_value?: string;
  _msdyn_salesagentprofileid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentoutputentityid?: string;
  msdyn_agentoutputentityname?: string;
  msdyn_agenttype?: number;
  msdyn_endtime?: string;
  msdyn_macroagentorchestrationid?: string;
  msdyn_name?: string;
  msdyn_runafterdate?: string;
  msdyn_salesagentrunid?: string;
  msdyn_starttime?: string;
  msdyn_stepentityid?: string;
  msdyn_stepentityname?: string;
  msdyn_triggers?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
