/**
 * msdyn_upgraderun entity type
 */
export interface msdyn_upgraderun {
  _createdby_value?: string;
  _createdonbehalfby_value?: string;
  _modifiedby_value?: string;
  _modifiedonbehalfby_value?: string;
  _organizationid_value?: string;
  createdon?: string;
  importsequencenumber?: number;
  modifiedon?: string;
  msdyn_error?: string;
  msdyn_finished?: string;
  msdyn_package?: string;
  msdyn_solution?: string;
  msdyn_startingversion?: string;
  msdyn_status?: number;
  msdyn_summary?: string;
  msdyn_targetversion?: string;
  msdyn_upgraderunid?: string;
  overriddencreatedon?: string;
  statecode?: number;
  statuscode?: number;
  timezoneruleversionnumber?: number;
  utcconversiontimezonecode?: number;
  versionnumber?: number;
}
