/**
 * msdyn_agentstatus entity type
 */
export interface msdyn_agentstatus {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_agentid_value?: string;
  _msdyn_currentpresenceid_value?: string;
  _msdyn_nextpresenceid_value?: string;
  _msdyn_presencemodifiedbyuserid_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_agentstatusid?: string;
  msdyn_assignedconversationcount?: number;
  msdyn_availableunitscapacity?: number;
  msdyn_capacitymodifiedon?: string;
  msdyn_capacitymodifiedonwithmilliseconds?: string;
  msdyn_eventname?: number;
  msdyn_isagentloggedin?: boolean;
  msdyn_isblockedbysomeprofile?: boolean;
  msdyn_name?: string;
  msdyn_presencemodifiedby?: string;
  msdyn_presencemodifiedon?: string;
  msdyn_presencemodifiedonwithmilliseconds?: string;
  msdyn_subeventname?: number;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
