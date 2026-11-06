/**
 * flowtriggerinstance entity type
 */
export interface flowtriggerinstance {
  _connectionreferenceid_value?: string;
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _flowtriggerid_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _ownerid_value?: string;
  _owningbusinessunit_value?: string;
  _owningteam_value?: string;
  _owninguser_value?: string;
  _workflowid_value?: string;
  createdon?: string;
  flowtriggerinstanceid?: string;
  importsequencenumber?: number;
  inputs?: string;
  modifiedon?: string;
  name?: string;
  overriddencreatedon?: string;
  runmode?: number;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
