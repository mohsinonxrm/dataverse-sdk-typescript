/**
 * agentactivity entity type
 */
export interface agentactivity {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _securityincidentid_value?: string;
  actionstarttime?: string;
  actiontargetkey?: string;
  activitystatus?: string;
  additionaldata?: string;
  agentactionname?: string;
  agentactivityid?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  threatactorids?: string;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
