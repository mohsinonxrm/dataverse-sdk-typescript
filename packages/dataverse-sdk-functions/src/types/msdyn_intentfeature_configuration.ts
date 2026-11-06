/**
 * msdyn_intentfeature_configuration entity type
 */
export interface msdyn_intentfeature_configuration {
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
  msdyn_batchjob_runstatus?: string;
  msdyn_copilotprovisioning_status?: string;
  msdyn_feature_status?: string;
  msdyn_intentfamilycopilotprovisioning_status?: string;
  msdyn_intentfeature_configurationid?: string;
  msdyn_isenabled?: boolean;
  msdyn_kbcopilotprovisioning_status?: string;
  msdyn_name?: string;
  msdyn_packageprovisioning_status?: string;
  msdyn_provision_trigger_time?: string;
  msdyn_target_entity_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
