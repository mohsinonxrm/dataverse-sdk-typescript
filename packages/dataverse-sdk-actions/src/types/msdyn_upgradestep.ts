/**
 * msdyn_upgradestep entity type
 */
export interface msdyn_upgradestep {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _msdyn_upgradeversion_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_dbversion?: number;
  msdyn_details?: string;
  msdyn_errors?: string;
  msdyn_finished?: string;
  msdyn_name?: string;
  msdyn_status?: number;
  msdyn_stepid?: string;
  msdyn_upgradestepid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
