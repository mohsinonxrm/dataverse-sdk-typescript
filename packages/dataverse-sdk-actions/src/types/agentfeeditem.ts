/**
 * agentfeeditem entity type
 */
export interface agentfeeditem {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  agentfeeditemid?: string;
  assignedto?: string;
  createdon?: string;
  data?: string;
  description?: string;
  group_type?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  overriddencreatedon?: string;
  priority?: string;
  scenario_run_id?: string;
  state?: string;
  statecode?: number;
  statuscode?: number;
  task_count?: number;
  tasks?: string;
  timezoneruleversionnumber?: number;
  title?: string;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
