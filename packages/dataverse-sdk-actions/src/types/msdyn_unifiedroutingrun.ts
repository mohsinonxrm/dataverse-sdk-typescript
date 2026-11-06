/**
 * msdyn_unifiedroutingrun entity type
 */
export interface msdyn_unifiedroutingrun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_assignedagent_value?: string;
  _msdyn_liveworkitem_value?: string;
  _msdyn_queue_value?: string;
  _msdyn_targetobject_value?: string;
  _msdyn_workstream_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_diagnosticversion?: string;
  msdyn_endtime?: string;
  msdyn_name?: string;
  msdyn_routingduration?: number;
  msdyn_routingdurationinseconds?: number;
  msdyn_routingstatus?: number;
  msdyn_runnumber?: number;
  msdyn_starttime?: string;
  msdyn_unifiedroutingrunid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
