/**
 * msdyn_salesagentprocessingstate entity type
 */
export interface msdyn_salesagentprocessingstate {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_regardingentity_value?: string;
  _msdyn_salesagentprofile_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentorchestrationid?: string;
  msdyn_currentprocessingstate?: number;
  msdyn_lastresearchendtime?: string;
  msdyn_lastresearchstarttime?: string;
  msdyn_manualrefreshes?: string;
  msdyn_name?: string;
  msdyn_nextrefreshtime?: string;
  msdyn_priority?: number;
  msdyn_salesagentprocessingstateid?: string;
  msdyn_totalresearchcount?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
