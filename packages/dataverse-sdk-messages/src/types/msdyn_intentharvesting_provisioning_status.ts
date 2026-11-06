/**
 * msdyn_intentharvesting_provisioning_status entity type
 */
export interface msdyn_intentharvesting_provisioning_status {
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
  msdyn_configurationstatus?: number;
  msdyn_harvestinglocalecode?: string;
  msdyn_harvestingstate?: string;
  msdyn_intentharvesting_provisioning_statusid?: string;
  msdyn_name?: string;
  msdyn_provisioning_operation_id?: string;
  msdyn_provisioning_status?: string;
  msdyn_provisioningstatus_package_id?: string;
  msdyn_provisioningstatus_packageid?: string;
  msdyn_runconfiguration?: string;
  msdyn_target_entity_name?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
